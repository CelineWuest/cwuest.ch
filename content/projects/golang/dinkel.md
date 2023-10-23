---
title: "dinkel"
date: 2023-10-21T17:53:02+02:00
summary: "A Powerful and Adaptable Cypher Fuzzer - My Bachelor's Thesis at ETH."
weight: 50
---

{{< alert cardColor="#e63946" iconColor="#1d3557" textColor="#f1faee" >}}
Dinkel is not yet open source.
I am planning on changing this in Q1/Q2 2024.
{{< /alert >}}
</br>

# The Powerful and Adaptable Cypher Fuzzer

{{< github repo="torvalds/linux" >}}

### About

Dinkel is a fuzzer which automatically generates complex and valid [Cypher]() queries.
Cypher is a query language for graph databases made by [Neo4j]() and has seen widespread adoption.
With dinkel, developers can easily test their Cypher implementations with very little setup necessary.

Dinkel outperforms other state-of-the art fuzzers in the complexity of queries it can generate, as well as the amount of data dependencies it can induce within the queries.
This allows dinkel to find many complex, previously unknown bugs.

You can read my paper on dinkel [here](/dinkel_paper.pdf).

### Results

During my Bachelor's Thesis, I was able to find 53 unique bugs with dinkel over three graph database systems. 33 of these bugs have been fixed and an additional 11 have been confirmed.

The systems I tested were [Neo4j](https://github.com/neo4j/neo4j), [RedisGraph](https://github.com/RedisGraph/RedisGraph) and [Apache AGE](https://github.com/apache/age).

### History

Dinkel is the product of my Bachelor's thesis which I wrote in the [AST Lab at ETH](https://ast.ethz.ch/) under the supervision of [Zu-Ming Jiang](https://jzuming.github.io/) and [Prof. Zhendong Su](https://people.inf.ethz.ch/suz/).

I started working on it in February of 2023 and released the 1.0 version in, well, somewhen in 2024 hopefully.