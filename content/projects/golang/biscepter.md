---
title: "biscepter"
date: 2024-03-07T12:09:29+01:00
summary: "Efficient Git Bisect using Docker Caching for Fast Repeated and Concurrent Bisection."
weight: 55
---

{{< github repo="DominicWuest/biscepter" >}}

## What it is

Biscepter is a CLI tool and Go package which allows for efficient and concurrent bisecting of issues.

It comes with some features and advantages over the standard [git bisect](https://git-scm.com/docs/git-bisect) implementation that make it better suited in some usecases.
These features include:

1. Caching of builds from previous bisects
1. Bisecting multiple issues at once
1. Possibility of prioritizing previously built commits to avoid arduous rebuilding
1. Easy builtin healthchecks to ensure the system under test is ready
1. Simple definition of builds through Dockerfiles

With these features, biscepter outshines git bisect when used on large projects or projects exhibiting multiple issues, such as large databases!

## Usage

Biscepter comes in the form of a CLI tool or Go package.

#### CLI Tool

The CLI tool creates a RESTful API endpoint, through which running systems can be retrieved and classified as good or bad.  
This allows programs written in any language to make use of biscepter, only needing to generate the API client whose [openAPI specification](https://github.com/DominicWuest/biscepter/blob/main/api/openapi.yml) is stored in the repository.

#### Go Package

Using the Go package is the simplest way of interacting with biscepter, requiring only importing the [package](https://pkg.go.dev/github.com/DominicWuest/biscepter/pkg/biscepter).  
With this package, jobs can be started through a simple function call, and information about systems ready for testing received via channels.

#### Job Configuration

When bisecting a project, a [job config](https://github.com/DominicWuest/biscepter/blob/main/configs/job-config.yml) has to be supplied, specifying all necessary details.
These details hold info such as the good and bad commit, the cost of building the project and the project's repository.

#### Examples

There are a few examples on how to use biscepter, be it via the CLI tool or Go package, in the [repository](https://github.com/DominicWuest/biscepter/tree/main/examples).
Be sure to check them out to have an easy time getting started!

## How it works

#### Concurrency

As soon as multiple issues get bisected at the same time, biscepter orchestrates different replicas, each made for bisecting one issue.
This coordination also requires consensus on docker images being built.
If such a consensus is not reached, multiple simultaneous builds of the same commit could occur, resulting in possibly tons of wasted compute.  
This also means that networking has to be managed, requiring port mappings to be created dynamically for every spun up replica.

#### Caching

In addition to this concurrency, biscepter also provides automatic caching of builds.
If two issues are bisected simultaneously or one after another and they both rely on testing a certain commit, then this commit only needs to be built once, with the second test reusing the already built docker image.  

In addition to that, biscepter may also divert from the standard binary search implementation and choose to test a commit that is not in the middle of the remaining list to test.
Biscepter does this, if it finds that the cost saved of running an already built, but suboptimally located, commit is non-negative.
This cost is calculated under the assumption that bugs are uniformly distributed over commits.
This assumption then allows biscepter to easily calculate the expected number of runs required for a full bisection using variables such as the provided cost of building a commit and the ratio of cached to uncached builds.  
For the curious, the exact formula for determining whether to use an offset, with the offset referring to the offset of the middle commit to the one under inspection, is:

{{< katex >}}
$$
 \begin{align*}
    bC &:= \text{Build cost (supplied by user for given repository)}\newline
    c &:= \text{Percentage of cached builds between current good and bad commit}\newline
    \newline
    \mathbb{E}[o] &:= \text{Expected number of runs if the offset is chosen}\newline
    \mathbb{E}[o] &= log_2(\mathbb{E}[\text{number of commits if offset is chosen}])\newline
    \mathbb{E}[nO] &:= \text{Expected number of runs if the offset is not chosen}\newline
    \mathbb{E}[nO] &= log_2(\mathbb{E}[\text{number of commits left to check}])\newline
    \newline
	oCost &:= \text{Cost when using the offset}\newline
	nOCost &:= \text{Cost when not using the offset}\newline
    \newline
    oCost &= \mathbb{E}[o] \cdot c + \mathbb{E}[o] \cdot (1 - c) \cdot bC + 1 && \hspace{-12em} // +1 \text{ since we know the next commit will be cached}\newline
    nOCost &= \mathbb{E}[nO] \cdot c + \mathbb{E}[nO] \cdot (1 - c) \cdot bC + bC && \hspace{-12em} // +bC \text{ since we know the next commit will be uncached}\newline
 \end{align*}\newline
$$

The offset is used, if \\(oCost < nOCost\\).