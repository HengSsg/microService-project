#!/bin/sh

redoc-cli build openapi.yaml

rm -rf index.html

mv redoc-static.html index.html

scp -i "/Users/baghyeongseog/keypair/hengsgg-naver.pem" index.html ubuntu@ec2-3-36-53-87.ap-northeast-2.compute.amazonaws.com:~/docker

scp -i "/Users/baghyeongseog/keypair/hengsgg-naver.pem" Dockerfile ubuntu@ec2-3-36-53-87.ap-northeast-2.compute.amazonaws.com:~/docker

ssh -i "/Users/baghyeongseog/keypair/hengsgg-naver.pem" ubuntu@ec2-3-36-53-87.ap-northeast-2.compute.amazonaws.com 'sudo docker build ~/docker -t server'

ssh -i "/Users/baghyeongseog/keypair/hengsgg-naver.pem" ubuntu@ec2-3-36-53-87.ap-northeast-2.compute.amazonaws.com 'sudo docker rm -f server'

ssh -i "/Users/baghyeongseog/keypair/hengsgg-naver.pem" ubuntu@ec2-3-36-53-87.ap-northeast-2.compute.amazonaws.com 'sudo docker run -d -p 80:80 --name server server'
