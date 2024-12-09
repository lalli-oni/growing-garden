---
title: Safari quirks
description: Instances where safari doesn't like to behave
categories:
  - safari
  - frontend
published: true
created: 2024-12-04
updated: 2024-12-04
---

While I have encountered both Firefox and Chromium dragging their legs on various features, Safari has been a right pain in the buns.
More than once I recollect having wrestled with one of these quirks but cannot remember the details, so for myself and others...

## SVG width/height required
Not setting svg width & height is translated to `100vh` by safari. So when the other browsers correctly size the svg relative to it's container that svg that might just be a small icon will be massive on safari browsers.
## ClipboardItem.supports()
Safari doesn't support `ClipboardItem.supports()`. So much for trying to be prudent to check what MIME type is supported by the browser.