---
title: Using Rust for Webassembly
description: Guide on a minimal setup for compiling Rust into webassembly for your web app
categories:
  - rust
  - webassembly
  - web
published: true
created: 2024-08-05
updated: 2024-08-05
---

This guide should give you a rought idea of what it takes to compile Rust code to WASM (WebAssembly) and how you can integrate it into your web application.

# But why?
For a brief description on what WebAssembly is, consider using a highly performant low level programming language and compiling that into a compact assembly-like binary format that runs at near-native performance. Javascript on the other hand is an interpreted language (although has a JIT compiler which can often give huge performance boost). But the primary performance issue for WASM is its runtime interoperability with JS. If you need to pass data back and forth between JS/WASM lands, then those performance gains might erode, or end up turning against you! That is being worked on though! Who knows, maybe that might be the final key to unlock widespread adoption.

WASM is old. Released in 2017 it's perhaps understandable that such a vast undertaking has taken quite a bit of time. But I personally find it surprising it hasn't been given a higher seat in the modern web development toolkit. Adoption is low, HTTP Archive in 2022 [source](https://almanac.httparchive.org/en/2022/webassembly) sees WASM modules account for only 0.04% (down from 0.06% in the previous year) of their captured traffic!

Well, what can it be used for you might be asking, why is this dude all up in arms over low adoption of a tool. Shouldn't the use case be the primary driver in adoption you might be saying. If you're thinking about something completely different I'm still going to touch upon potential use cases.

First off, what is it currently being used for? According to the previous article big players using it include Google Earth, figma, Unity and AutoCAD. But they all seem to have rather specific use cases. One wouldn't start eyeing low level programming languages for a simple digital garden like this one, right?! Well, one common critique of modern web development is packages. Some of the more popular npm packages represent a considerable portion of web traffic and computing elecricity usage [citation needed]. What would the impact be if `react` were to be fully rewritten compiling to WebAssembly?

For a list of other potential WASM use cases: https://webassembly.org/docs/use-cases/

# Why Rust?

Compiler power + types! Think svelte. Which leverages compiler magic instead of sending the runtime library across the wire to the client machine. 

## Step 1: Setup Rust development environment

## Step 2: Compile Rust code to WebAssembly

## Step 3: Use the WebAssembly code in your web app
https://rustwasm.github.io/docs/book/introduction.html

## What next?
Integrated build?
Type sharing?

# Performance details
Ref: https://www.youtube.com/watch?v=4KtotxNAwME

1. According to ref a lot of the interop performance is tied to js being utf-16 but rust utf-8. Meaning every string interop has to transform between encoding
2. Size. You need to ship js "glue" with your WASM binary. But WASM binary is also really big, no tree shaking yet.