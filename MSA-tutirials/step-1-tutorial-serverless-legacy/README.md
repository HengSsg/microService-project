# Step-1 : Serverless 기반 legacy 시스템 배포 및 테스트 학습

code/step-1 폴더에 있는 
init.sh.md 의 내용을 따라하면서 

legacy function을 배포하고 구현해보세요


<!--
title: 'Serverless Framework Node SQS Producer-Consumer on AWS'
description: 'This template demonstrates how to develop and deploy a simple SQS-based producer-consumer service running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

참조 :  Serverless Framework Node SQS Producer-Consumer on AWS

----
```
curl -w "@curl-format.txt" --location --request POST 'https://7zl3klb67k.execute-api.ap-northeast-2.amazonaws.com/producer_consumer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": 1
}'
```
라는 요청을 보내면 `"input": 1`이라는 리퀘스트 바디가 전송되고 legacy-handler.js는 `2`라는 리스폰스를 리턴한다.