---
title: "How to: Encryption at Rest on AWS"
date: "2019-04-26T09:17:32Z"
layout: post
draft: false
path: "/posts/encryption-at-rest-aws/"
category: "programming"
tags:
  - "aws"
  - "security"
description: "How to add encryption at rest for most of the commonly used AWS services."
---
In addition to the relevant government and industry regulations and standards, most organisations will have a policy that cover encryption at rest such as as a Data Secuirty Policy or a Cloud Security Policy. The general consensus of these is that encryption at rest should be enable on anything that is classified as "Restricted" however, I personally think that encryption at rest should be enabled on all systems in AWS regardless of the data classification so that we are comfortable with the process at all levels.

#Why is Encryption at Rest Important?

In today's security climate it is good practice to enable encryption on everything whether the data is in motion (HTTPS/SSL) or when it is at rest sitting on a disk. There are many techniques to protect data at rest ranging from physical security, intrusion detection and file integrity, anti-virus through to encryption.

With Cloud Services encryption is what we have the most control over.

#Self managed vs AWS managed keys

In the majority of services there are two options for managing the encryption keys.

##AWS managed

For most teams and applications AWS managed keys is the simplest and easiest options. AWS will auto generate a key for each service in each region and use these when enabling encryption. This service specific key is generated and encrypted using the the Customer Master Key. AWS will also mange the lifecycle of the generated service specific key.

##Self managed

A number of services allow you to specify an alternative key to the default one e.g. when uploading an item to an S3 bucket you can specify `--sse aws:kms --sse-kms-key-id <key-id>` which will encrypt the object with a specific key.

Self managed keys are great for when you want additional control over the management of the key and its life cycle or alternatively when needing to create even more secure of segregated data e.g. using a client specific key for storing s3 objects.

#Enabling Encryption on Rest on AWS Services

##RDS

Enabling encryption on RDS is a simple flag for all engines. When creating your RDS instances you needs to specify the StorageEncrypted parameter.

Retrofitting and existing RDS instance with encryption is a little more involved as you cannot set the StorageEncrypted parameter after creation.

1. Take a snapshot of the RDS instance
1. Copy and encrypt the snapshot
1. Create a new RDS instance from the snapshot, which will now be encrypted
1. Clean up the old instance

Cloud Conformity have an excellent write up on [enabling encryption on an existing RDS instance](https://www.cloudconformity.com/conformity-rules/RDS/rds-encryption-enabled.html) using the console or CLI.

All infrastructure code and automation should also be updated to enable the setting when creating environments.

##DynamoDB

DynamoDB has encryption at rest enabled by default using AWS managed keys. You can read more about encryption in DynamoDB on the [AWS Documentation](https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/encryption.usagenotes.html).

##S3

S3 buckets can be encrypted after creation using the `put-bucket-encryption` command. See [Cloud Conformity's resolution guide](https://www.cloudconformity.com/conformity-rules/S3/bucket-default-encryption.html) on how to do this. One thing to note is that this will not encrypt existing objects in the bucket. You will need manually encrypt all existing objects which can be done with a recursive copy into the same bucket.

`aws s3 cp s3://bucket-name/prefix-a/ s3://bucket-name/prefix-a/ --recursive --sse AES256`

Cloudformation Example

```yaml
SomeS3Bucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: SomeS3Bucket
    BucketEncryption:
      ServerSideEncryptionConfiguration:
        - ServerSideEncryptionByDefault:
            SSEAlgorithm: AES256
```

##EC2

Similar to RDS, encryption can only be specified when an EBS volume is created by setting the Encrypted flag.

Encrypting volumes that were not encrypted at creation requires a multi-step process.

1. Take a snapshot of the volume
1. Copy the snapshot with encryption
1. Create a new volume from the snapshot
1. Detach the unencrypted volume from the EC2 instance and attach the new encrypted volume.

You can do this [manually](https://www.cloudconformity.com/conformity-rules/EBS/ebs-encrypted.html) or there are a [couple](https://github.com/jbrt/ec2cryptomatic) of [tools](https://github.com/conradf7/ebs-encrypt) to step through the process for you.

###Root Volumes

Encrypting root volumes on existing instances is the same process as above. However creating new instances with encrypted root volumes is more involved.

####Option 1: Never save data to the root volume

This is a viable option for many applications especially as more and more applications and services are being specifically designed around this.

However this option may not be acceptable for older applications or vendor applications where you have less control of where and what data is written. For example Windows application may be storing sensitive information in the Registry or writing events to the Windows Event Log which may end up on C drive. Vendor applications may writing logs or caches to disk in locations that you cannot control.

####Option 2: Create an AMI with encrypted root volume

Where you cannot avoid writing to the root volume, or if you just want the extra assurance, you can create and manage your own [AMI with encrypted snapshots](https://aws.amazon.com/blogs/security/how-to-create-a-custom-ami-with-encrypted-amazon-ebs-snapshots-and-share-it-with-other-accounts-and-regions/). This is a significantly more involved process as you will now need to ensure that the AMI is properly managed including patching and OS updates, providing cross account access for Non-Prod and Prod accounts etc.

####Option 3: Go Serverless

Where viable you can redesign or architect the servers out of the application using serverless architecture using any of the AWS managed infrastructure services e.g Lambda, Fargate etc. For new services this should be considered but will likely not be desirable for "lift and shift" style applications where the architecture is moved onto the cloud as-is.

There is no "right" answer here and it will depend on the level of maturity that the application team has in Cloud as well as the discipline they have when developing and enhancing the application to avoid accidentally circumventing option 1.

##SNS

Adding encryption to an exiting SNS topic can only be done [using the Web Console](https://www.cloudconformity.com/conformity-rules/SNS/server-side-encryption.html) at the moment.

You can enable it on new topics by setting the `KmsMasterKeyId` when creating the resource. It is recommended that you use the default `alias/aws/sns` key.

##Other Services

The above are the most common services for storing data. There are some others that are:

- not in great use at the moment e.g. RedShift
- a combination of services e.g. Beanstalk
- not intended for data storage

Whilst I have not covered every services options you should consider how you can enable encryption at rest for any and all services that you use on AWS.
