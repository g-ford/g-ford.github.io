---
title: 'dotnet in a Serverless world'
date: '2019-03-08T22:12:03.284Z'
category: 'test'
published: true
tags: ['dotnet', 'serverless', 'aws']
something: 'else'
---

Serverless development is becoming a pretty common pattern now-a-days. There are some nice libraries and frameworks popping up and the aptlay named
[Serverless](https://serverless.com) seems to be the most popular.[^1]

[Serverless](https://serverless.com) does support [dotnet core using C#](https://serverless.com/framework/docs/providers/aws/examples/hello-world/csharp/) out of the box. They even have a generator.

```bash
sls create --template aws-csharp --path helloService
```

This is a fantastic starting point for any other than a REST API. If you try and use this stub, you end up having to implement half of WebAPI manually to be able to get niceties such as Dependency Injection and logging.

I have found the the AWS template is far more suitable to implementing an actual REST API and it is just as simple to get started.

```bash
dotnet new -i "Amazon.Lambda.Templates::*"
dotnet new serverless.AspNetCoreWebAPI -o my-serverless-api
```

This will create a new .Net Core Web API application in the `my-serverless-api` folder including a CloudFormation template for easy deployment and a `cake` file for build, test and deploy. For those that have done extensive WebAPI work, the structure will feel a lot more familiar.

```
├── README.md
├── Solution.sln
├── build.cake
├── build.ps1
├── build.sh
├── src
│   └── HelloWorld
│       ├── HelloWorld.csproj
│       └── Program.cs
├── template.yaml
└── test
    └── HelloWorld.Test
        ├── FunctionTest.cs
        └── HelloWorld.Tests.csproj
```
