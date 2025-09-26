---
title: Your answers must be an array
series: Bugs in the wild
description: Instances where safari doesn't like to behave
categories:
  - bugs-in-the-wild
  - frontend
  - bug
published: true
created: 2025-09-18
updated: 2024-09-18
---

Foreword: This is a first of a collection of articles about bugs I encounter in the wild. I believe it's nice to see what bugs a regular (citation needed) user encounters in production environments

I am choosing to not disclose the company/website. To be honest mostly to avoid controversies. In the end everyone has bugs and publicising them does not have to mean "name & shame".

Was applying for a job posting. Application form had a few large textareas asking how many years of experience you have with typescript/reactjs/javascript (max of 250 characters a bit excessive maybe, but neurodivergents often have a problem with brevity (yes the irony is not lost on me within these second level of parentheses)). And one question about commuting. I (perhaps foolishly) included a short message apologizing if I misunderstood anything from their original job posting as it said it was remote-first while the question seemed to indicate high precence in the office. Just for good measure I threw in a \<3 heart to declare my peaceful intentions (honestly, I do emphathize with recruiters swamped with applications these days, would be a whole lot easier if they just picked me right away!).

Okay, now that we got through this lengthy context, on to the bug. As I submitted I was presented with a red error text stating "results must be an array". Well hello! Server side validation failing. The response was 400: Bad request (which I predict is an unintended lie, but we'll get to that). Removing the "\<3" resulted in a 200: OK and we are all good. So not a very impactful bug, hardly 3 minutes of my time wasted (although my time is extremely valuable to me, but anywho).

Now I am going out on a limb here guessing on server input validation. But I think it's a pretty good candidate. It encounters unexpected characters, and rejects the request. Now, that doesn't sound like the request is neccesarily bad though, is it? Heck, the ability to write fx. ">3 years of experience" sounds like a rather common scenario for a product focused on job postings & applications, right? Not to say this isn't understandable, one might throw in a package to help with input validation and forget about it.

The bug was reported to the site. Will update in case we get a reply.