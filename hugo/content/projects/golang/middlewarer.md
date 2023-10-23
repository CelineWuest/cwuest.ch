---
title: "middlewarer"
date: 2023-10-21T23:47:03+02:00
summary: "A Go generator generating middleware frameworks for any interface."
weight: 60
---

{{< github repo="DominicWuest/middlewarer" >}}

## How it works

Middlewarer is a [Go generator](https://go.dev/blog/generate) which takes in the name of a Go interface (let's call it `Foo`) and generates a middleware framework for it.

It then creates a new file and defines within it a struct implementing `Foo` which will act as the middleware.

Users can then call the generated wrapper function `WrapFoo`, which accepts as parameters an implementation of `Foo` to wrap and middleware functions to call.
These middleware functions can be `nil`, meaning that no boilerplate code is required for methods the user doesn't want to attach middleware to.
This wrapper function then returns another implementation of `Foo` which can now be used in place of the original implementation passed to the wrapper.

The passed middleware functions can then easily operate on the method arguments (e.g. sanitize them, change their format etc), add logging, metrics and more without the programmer having to ever touch their original implementation of `Foo`.

## Why I created it

I created middlewarer as a solution to a problem I encountered with [dinkel](/projects/golang/dinkel/).
In dinkel, I had an implementation of the `DB` interface for every system I would test and a `Strategy` implementation for every fuzzing strategy.

However, I noticed that I would have to refactor my code drastically when I wanted to add a Prometheus exporter to these implementations, which would provide metrics on query generation latency, found bugs, invalid query rate, etc.
I couldn't add a generic Prometheus exporter to them, as there isn't a clean way of generalizing the metrics of the different systems and strategies.

Additionally, not all interface methods provide insightful metrics, so it was important for me that I don't have to worry about having to create unnecessary boilerplate code for every interface method that I didn't want to attach middleware software to.

As a solution, I came up with the idea of writing my first Go generator, which allows easy creation of an efficient middleware framework for any interface which doesn't require the programmer to define middleware functions for every interface method.
The solution worked flawlessly for dinkel and I use it there for logging and metrics collection.