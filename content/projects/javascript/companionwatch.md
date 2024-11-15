---
title: "CompanionWatch"
date: 2023-10-21T23:49:16+02:00
summary: "A Website for Watching Videos with your Friends!"
weight: 90
---

{{< github repo="CelineWuest/CompanionWatch" >}}

CompanionWatch is a website that synchronizes YouTube videos between users.
It has a chat and search functionality, allowing friends to watch whatever videos they want, together :)

Back when I first heard about [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) I wanted to try them out myself and came up with the idea of creating this site.
The website uses [socket.io](https://socket.io/) for the bidirectional low-latency communication and its backend is written in Node.js.

- Currently hosted under [cw.cwuest.ch](https://cw.cwuest.ch).
