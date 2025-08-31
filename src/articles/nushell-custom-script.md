---
title: Writing nushell custom scripts
description: How to write custom scripts for nushell
categories:
  - nushell
  - scripting
  - workflow
  - tools
published: true
created: 2024-07-30
updated: 2024-07-30
---

Nushell is a great shell to work with. I got tired of figuring out a 100 different way of implementing logical flow based on regex matching in zsh. As much as a I loved charmbracelet/gum https://github.com/charmbracelet/gum.

Who doesn't love having great error messages, types and functional programming directives at your fingertips? Doing trial & error is such a breeze when you have all of these DX benefits we take granted when writing our source code. Why are our expectations so low in the terminal?

Also the billion different ways to organize ones shell is lovely, but there is hardly any kind of template for people to get quickly started using the shell. Put someting in your `.zshbash`, but where is it? How you find out depends on OS, how it was installed and wind direction of the given day.

Here I want to present a couple of nushell scripts I have used, I won't guarantee they are perfect, but good enough that I don't abandon using them quickly.

- Rebase (merge?) feature branch on master workflow
- cyberghost vpn quick connect
- git stash management (can't remember how complete that was)

Other things I'd like easier to approach when looking into nushell

- A common sense setup
  - Extract boilerplate from default `env.nu` and `config.nu`
  - Where to house custom scripts
- Nushell module development
- Can you achieve what you need with modules?
- Lacking UI functions
- documentation issues
  - Better cheatsheet (fx. all type castings)
  - When do you need rust?
  - Plugin directory, can't see which are out of date, no tags

```
nushell code here
```