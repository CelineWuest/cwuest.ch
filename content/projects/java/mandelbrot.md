---
title: "Mandelbrot (2019)"
date: 2023-10-21T22:08:26+02:00
summary: "An interactive display of the Mandelbrot set, where the rendering is optimized with parallel programming."
weight: 100
---

{{< github repo="DominicWuest/Mandelbrot" >}}

This was my first try at parallel programming.
I used Java threads to improve the performance of rendering the Mandelbrot set by splitting the pixel workloads between threads.