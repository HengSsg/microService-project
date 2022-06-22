```shell
export AWS_PROFILE=FILL_ME_IN # 자신의 AWS 프로필 이름을 정해주세요.

aws configure list
#       Name                    Value             Type    Location
#       ----                    -----             ----    --------
#    profile                      seb           manual    --profile
# access_key     ****************NROC shared-credentials-file
# secret_key     ****************lkTd shared-credentials-file
#     region           ap-northeast-2      config-file    ~/.aws/config

export QUEUE_URL=FILL_ME_IN && serverless deploy --aws-profile default --region ap-northeast-2

# Deploying aws-node-sqs-worker to stage dev (ap-northeast-2)

# ✔ Service deployed to stack aws-node-sqs-worker-dev (291s)

# endpoint: POST - https://i6zicz60xh.execute-api.ap-northeast-2.amazonaws.com/produce
# functions:
#   producer: aws-node-sqs-worker-dev-producer (18 kB)
#   jobsWorker: aws-node-sqs-worker-dev-jobsWorker (18 kB)
# jobs: https://sqs.ap-northeast-2.amazonaws.com/761533579280/aws-node-sqs-worker-dev-jobs

# Improve API performance – monitor it with the Serverless Dashboard: run "serverless"

serverless remove --aws-profile default --region ap-northeast-2 --stage dev --verbose
# Removing aws-node-sqs-worker from stage dev (ap-northeast-2)

# ✔ Service aws-node-sqs-worker has been successfully removed (204s)

## "여러 aws 계정중에서 특정 계정으로 안전하게 배포 하기위한 실행명렁어는?"
serverless deploy 

# Deploying aws-node-sqs-worker to stage dev (ap-northeast-2)

# ✔ Service deployed to stack aws-node-sqs-worker-dev (285s)

# endpoint: POST - https://d1bj050838.execute-api.ap-northeast-2.amazonaws.com/produce
# functions:
#   producer: aws-node-sqs-worker-dev-producer (18 kB)
#   jobsWorker: aws-node-sqs-worker-dev-jobsWorker (18 kB)

# Stack Outputs:
#   ProducerLambdaFunctionQualifiedArn: arn:aws:lambda:ap-northeast-2:761533579280:function:aws-node-sqs-worker-dev-producer:1
#   jobsQueueUrl573F5B7A: https://sqs.ap-northeast-2.amazonaws.com/761533579280/aws-node-sqs-worker-dev-jobs
#   jobsQueueArnA5A2FF7E: arn:aws:sqs:ap-northeast-2:761533579280:aws-node-sqs-worker-dev-jobs
#   jobsDlqUrl2C7FA9D4: https://sqs.ap-northeast-2.amazonaws.com/761533579280/aws-node-sqs-worker-dev-jobs-dlq
#   HttpApiId: d1bj050838
#   JobsWorkerLambdaFunctionQualifiedArn: arn:aws:lambda:ap-northeast-2:761533579280:function:aws-node-sqs-worker-dev-jobsWorker:1
#   ServerlessDeploymentBucketName: aws-node-sqs-worker-dev-serverlessdeploymentbucke-1cg96x6f101vr
#   HttpApiUrl: https://d1bj050838.execute-api.ap-northeast-2.amazonaws.com
# jobs: https://sqs.ap-northeast-2.amazonaws.com/761533579280/aws-node-sqs-worker-dev-jobs

# Improve API performance – monitor it with the Serverless Dashboard: run "serverless"

```

# aws-sdk를 이용한 sqs 메시지 보내기

```javascript
 await sqs
      .sendMessage({
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: event.body,
        MessageAttributes: {
          AttributeName: {
            StringValue: "Attribute Value",
            DataType: "String",
          },
        },
      })
      .promise();

```

QUEUE_URL 설정은 lambda 구성에서 확인 가능합니다.

```shell
curl -w "@curl-format.txt" --location --request POST "https://ey3l9g5r3b.execute-api.ap-northeast-2.amazonaws.com/produce" --header "Content-Type: application/json" \
--data-raw '{
    "input": 1
}'

{"message":"Message accepted!"}

--------------------------------
     time_namelookup:  0.013217s
        time_connect:  0.017373s
     time_appconnect:  0.038983s
    time_pretransfer:  0.039352s
       time_redirect:  0.000000s
  time_starttransfer:  0.039475s
                     ----------
          time_total:  1.731484s
```

CloudWatch 로그를 통해 데이터가 잘 들어간 것을 확인할 수 있습니다.