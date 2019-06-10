---
title: APIs vs Microservices
date: "2019-06-03T09:17:32Z"
layout: post
draft: false
path: "/posts/apis-vs-microservices/"
category: "programming"
tags:
  - "apis"
  - "microservices"
description: "A brief discussion on the difference and similarities of APIs and Microservices"
---

The terms API and microservice often get interchanged and mixed in a conversation, however there are some significant differences in the terms.

#APIs

AN API is a collection of actions that can be performed on a dataset. Most often this will be exposed as a ReSTful style i.e. HTTP verbs on a resource, although alternatives such as GraphQL are becoming increasingly popular.

The advantages of a ReSTful API is that it is generally consistent set of actions and therefore quite simple for an application developer to 'guess' what the correct usage of the API is. There is common set of principles and each technology has a generally accepted approach to implementing them.

#Microservice

From Wikipedia

> "a software development technique—a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight.M"

The key phrase in this description is loosely coupled. This enables a number of key features:

- more conscious design is put into the data model and context boundaries, providing better domain models and preventing "big-ball-of-mud" designs from accidentally occurring
- reduced risk e.g. a change in one service does not affect the entire application, conversely a delay in one service does not stall the entire application
- complexity of individual services is reduced allowing development to be faster, especially for new starters

However, whilst individual services may be reduced in complexity and allow faster evolution and deployment, the additional operational overhead of the integration of components and monitoring and debugging of a distributed system is something that needs to be considered.

#The difference

An API is a contract on how to use a service. A microservice is an architectural design pattern that separates applications into multiple physical components.

A traditional monolithic application can expose an API (or several) and a microservice will usually expose an API. However the difference is highlighted in the way inter-service communication is conducted. In a traditional monolithic applications, services and domains will directly interact at the code and data level, tying them together. In a microservice architecture communication is through contracts, using generic data interchange formats allowing the services to evolve and/or be replaced without affecting each other.

#Conclusion

A microservice is an architectural pattern that will often expose an API as part of the service. There are many more advantages to microservices than just having a API however the operational overhead and complexity is something that needs to be considered.
