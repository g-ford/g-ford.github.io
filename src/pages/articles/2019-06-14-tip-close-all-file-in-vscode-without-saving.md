---
title: 'Tip: Close all file in VSCode without saving'
path: /posts/tip-close-all-files-in-vscode-without-saving
date: 2019-06-14T02:20:32.209Z
category: programming
tags:
  - tip
  - vscode
layout: post
draft: false
description: "A quick tip for when you accidentally make changes to 100's of files in Visual Studio Code and don't want to save them."
---

I updated my root folder because it had a typo in it. For some reason every time I type the word `survey` my fingers decide `survery` is what I really need.

After renaming the folder and blindly hitting "yes" to update all the imports and references I was left with a large number of open files with changes that I didn't need - nearly all of them were changes to `node_modules` import statements.

![](/assets/screen-shot-2019-06-14-at-12.15.41-pm.png)

Try to close these using the `Close All` option in the tab context menu and you will get a dialog for each and every one of those unsaved open files.

![](/assets/screen-shot-2019-06-14-at-12.16.12-pm.png "This might take a while")

After getting annoyed with this I did some googling, quickly finding many people with the same issue. In particular this [open issue #44024](https://github.com/Microsoft/vscode/issues/44024) in which it is mentioned that the `Close Folder` action will combine all the files.

| ![](/assets/screen-shot-2019-06-14-at-12.16.49-pm.png) | ![](/assets/screen-shot-2019-06-14-at-12.17.05-pm.png) |
|-|-|

This was much nicer.

You still need to `Close All` once you open the project up again but you won't be asked to save each and every one of them again.
