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
serverless deploy FILL_ME_IN # serverless cli option을 참고하여 아래처럼 과정이 나오면서, stage, 프로필 지정, 리전 지정해서 안전하게 실행해보는 방법으로 명령어를 실행해보세요.

# Deploying aws-node-sqs-worker to stage dev (ap-northeast-2)

# Packaging
# Excluding development dependencies for service package
# Retrieving CloudFormation stack
# Creating CloudFormation stack
# Creating new change set
# Waiting for new change set to be created
# Change Set did not reach desired state, retrying
# Executing created change set
#   CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - aws-node-sqs-worker-dev
#   CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
#   CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
#   CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
#   CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
#   CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
#   CREATE_COMPLETE - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
#   CREATE_COMPLETE - AWS::CloudFormation::Stack - aws-node-sqs-worker-dev
# Uploading
# Uploading CloudFormation file to S3
# Uploading State file to S3
# Uploading service aws-node-sqs-worker.zip file to S3 (18.45 kB)
# Updating CloudFormation stack
# Creating new change set
# Waiting for new change set to be created
# Change Set did not reach desired state, retrying
# Executing created change set
#   UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - aws-node-sqs-worker-dev
#   CREATE_IN_PROGRESS - AWS::Logs::LogGroup - JobsWorkerLogGroup
#   CREATE_IN_PROGRESS - AWS::Logs::LogGroup - ProducerLogGroup
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Api - HttpApi
#   CREATE_IN_PROGRESS - AWS::SQS::Queue - jobsDlqD18CF374
#   CREATE_IN_PROGRESS - AWS::Logs::LogGroup - JobsWorkerLogGroup
#   CREATE_IN_PROGRESS - AWS::SQS::Queue - jobsDlqD18CF374
#   CREATE_IN_PROGRESS - AWS::Logs::LogGroup - ProducerLogGroup
#   CREATE_COMPLETE - AWS::Logs::LogGroup - JobsWorkerLogGroup
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Api - HttpApi
#   CREATE_COMPLETE - AWS::ApiGatewayV2::Api - HttpApi
#   CREATE_COMPLETE - AWS::Logs::LogGroup - ProducerLogGroup
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Stage - HttpApiStage
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Stage - HttpApiStage
#   CREATE_COMPLETE - AWS::ApiGatewayV2::Stage - HttpApiStage
#   CREATE_COMPLETE - AWS::SQS::Queue - jobsDlqD18CF374
#   CREATE_IN_PROGRESS - AWS::SQS::Queue - jobsQueueCEDBAE3E
#   CREATE_IN_PROGRESS - AWS::SQS::Queue - jobsQueueCEDBAE3E
#   CREATE_COMPLETE - AWS::SQS::Queue - jobsQueueCEDBAE3E
#   CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
#   CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
#   CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
#   CREATE_IN_PROGRESS - AWS::Lambda::Function - ProducerLambdaFunction
#   CREATE_IN_PROGRESS - AWS::Lambda::Function - JobsWorkerLambdaFunction
#   CREATE_IN_PROGRESS - AWS::Lambda::Function - JobsWorkerLambdaFunction
#   CREATE_IN_PROGRESS - AWS::Lambda::Function - ProducerLambdaFunction
#   CREATE_COMPLETE - AWS::Lambda::Function - ProducerLambdaFunction
#   CREATE_COMPLETE - AWS::Lambda::Function - JobsWorkerLambdaFunction
#   CREATE_IN_PROGRESS - AWS::Lambda::Version - ProducerLambdaVersionr1eDRlzIIUx9PwKjjj0H729TZNspkCKrLor7UsTE
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Integration - HttpApiIntegrationProducer
#   CREATE_IN_PROGRESS - AWS::Lambda::Version - JobsWorkerLambdaVersion1Bi7V8OFohWJmEfDRoM0geWUleY9XDRvJ7XUhovXMq8
#   CREATE_IN_PROGRESS - AWS::Lambda::Version - ProducerLambdaVersionr1eDRlzIIUx9PwKjjj0H729TZNspkCKrLor7UsTE
#   CREATE_IN_PROGRESS - AWS::Lambda::Permission - ProducerLambdaPermissionHttpApi
#   CREATE_COMPLETE - AWS::Lambda::Version - ProducerLambdaVersionr1eDRlzIIUx9PwKjjj0H729TZNspkCKrLor7UsTE
#   CREATE_IN_PROGRESS - AWS::Lambda::EventSourceMapping - JobsWorkerEventSourceMappingSQSJobsQueueCEDBAE3E
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Integration - HttpApiIntegrationProducer
#   CREATE_IN_PROGRESS - AWS::Lambda::Permission - ProducerLambdaPermissionHttpApi
#   CREATE_COMPLETE - AWS::ApiGatewayV2::Integration - HttpApiIntegrationProducer
#   CREATE_IN_PROGRESS - AWS::Lambda::Version - JobsWorkerLambdaVersion1Bi7V8OFohWJmEfDRoM0geWUleY9XDRvJ7XUhovXMq8
#   CREATE_COMPLETE - AWS::Lambda::Version - JobsWorkerLambdaVersion1Bi7V8OFohWJmEfDRoM0geWUleY9XDRvJ7XUhovXMq8
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Route - HttpApiRoutePostProduce
#   CREATE_IN_PROGRESS - AWS::Lambda::EventSourceMapping - JobsWorkerEventSourceMappingSQSJobsQueueCEDBAE3E
#   CREATE_IN_PROGRESS - AWS::ApiGatewayV2::Route - HttpApiRoutePostProduce
#   CREATE_COMPLETE - AWS::ApiGatewayV2::Route - HttpApiRoutePostProduce
#   CREATE_COMPLETE - AWS::Lambda::Permission - ProducerLambdaPermissionHttpApi
#   CREATE_COMPLETE - AWS::Lambda::EventSourceMapping - JobsWorkerEventSourceMappingSQSJobsQueueCEDBAE3E
#   UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - aws-node-sqs-worker-dev
#   UPDATE_COMPLETE - AWS::CloudFormation::Stack - aws-node-sqs-worker-dev
# Retrieving CloudFormation stack
# Removing old service artifacts from S3

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
curl -w "@curl-format.txt" --location --request POST "https://azhwkza6ta.execute-api.ap-northeast-2.amazonaws.com/produce" --header "Content-Type: application/json" \
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