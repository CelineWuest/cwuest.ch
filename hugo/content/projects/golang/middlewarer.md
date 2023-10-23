---
title: "middlewarer"
date: 2023-10-21T23:47:03+02:00
summary: "A Go generator generating middleware frameworks for any interface."
weight: 70
---

{{< github repo="DominicWuest/middlewarer" >}}

## How it works

## Why I created it

I created middlewarer as a solution to a problem I encountered with [dinkel](/projects/golang/dinkel/).
In dinkel, I had an implementation of the `DB` interface for every system I would test.

However, I noticed that I would have to refactor my code drastically when I wanted to add a Prometheus exporter to these models, which would provide metrics on query generation latency, found bugs, invalid query rate, etc.
I couldn't add a generic Prometheus exporter to these implementations, as there isn't a clean way of generalizing the metrics of these different systems.

Additionally, not all interface methods provide insightful metrics, so it was important for me that I don't have to worry about having to create unnecessary boilerplate code for every interface method that I didn't want to attach middleware software to.

As a solution, I came up with the idea of writing my first Go generator, which allows easy creation of an efficient middleware framework for any interface which doesn't require the programmer to define middleware functions for every interface method.
The solution worked flawlessly for dinkel and I use it there for logging and metrics collection.