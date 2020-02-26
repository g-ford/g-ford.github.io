---
title: On Kubernetes
path: /posts/on-kubernetes
date: 2020-02-26T22:10:22.566Z
category: programming
tags:
  - kubernetes
layout: post
draft: false
description: Thoughts on messing about with Kuberenetes and the surrounding ecosystem
---
Kubernetes is a beast. 

<img src="/assets/gabriel-bnohz9c4lqg-unsplash.jpg" alt="Uknown road" title="Unknown road" style="object-fit: cover; width: 100%; height: 337px;" />
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@natural?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Gabriel"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Gabriel</span></a>

It's easy enough to get a basic cluster stood these days thanks to myriad of cloud offerings - not to mention the gluttony of tools create and manage a cluster.

Then I started looking at services meshes and ingress options and monitoring...next thing I knew the 'simple' single node cluster with 16GB of ram and 8 CPUs was not quite enough.

I'm evaluating options for standing up a platform for microservices.  At this point I'd kind of prefer to use a Serverless platform.  However, in a heavily regulated industry with regulators that are little resistant to change Cloud is still a bit of a dream.

So I think I need to get a lot more aquainted with Kubernetes and istio and maybe ambassador and prometheus and kiali and when does the list finish?!
