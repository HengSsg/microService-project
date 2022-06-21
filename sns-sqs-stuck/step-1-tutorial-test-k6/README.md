# Step-1: 성능 테스트

`Day 1-Step 2`에서 만든 인프라의 성능을 테스트할 수 있습니다.

## prerequisite
Day 1 - Step 2 에서 이어집니다.

## 1. k6 설치

성능 측정 도구 k6를 설치합니다. [설치 문서](https://k6.io/docs/getting-started/installation/)를 참고하세요.

## 2. 성능 테스트

앞서 만든 lambda 함수의 성능을 확인해봅니다. 앞서 Day 1-Step 2에서 curl로 직접 요청을 보내 응답속도를 확인해보았습니다.

```
$ curl --location --request POST 'https://k27ch9by51.execute-api.ap-northeast-2.amazonaws.com/produce' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "input": "1"
}'
```


이번에는 curl 대신 k6를 이용하여 성능을 측정할 것입니다.

- `single-request.k6.js` 의 엔드포인트를 수정하세요


### 성공 사례



```shell
$ k6 run -u 1 -i 100 ./single-request.k6.js    

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: ./single-request.k6.js
     output: -

  scenarios: (100.00%) 1 scenario, 20 max VUs, 3m30s max duration (incl. graceful stop):
           * default: Up to 20 looping VUs for 3m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

INFO[0001] {"input":1,"step":3}                          source=console
INFO[0002] {"input":1,"step":3}                          source=console

running (0m02.7s), 00/20 VUs, 2 complete and 1 interrupted iterations
default ✗ [--------------------------------------] 01/20 VUs  0m02.7s/3m00.0s

     ✓ status is 200
     ✓ response body

     checks.........................: 100.00% ✓ 4        ✗ 0
     data_received..................: 6.0 kB  2.2 kB/s
     data_sent......................: 1.0 kB  381 B/s
     http_req_blocked...............: avg=88.55ms min=2µs   med=88.55ms max=177.1ms  p(90)=159.39ms p(95)=168.25ms
     http_req_connecting............: avg=2.64ms  min=0s    med=2.64ms  max=5.29ms   p(90)=4.76ms   p(95)=5.03ms
     http_req_duration..............: avg=1.04s   min=1.04s med=1.04s   max=1.05s    p(90)=1.05s    p(95)=1.05s
       { expected_response:true }...: avg=1.04s   min=1.04s med=1.04s   max=1.05s    p(90)=1.05s    p(95)=1.05s
     http_req_failed................: 0.00%   ✓ 0        ✗ 2
     http_req_receiving.............: avg=86µs    min=67µs  med=86µs    max=105µs    p(90)=101.2µs  p(95)=103.1µs
     http_req_sending...............: avg=735µs   min=92µs  med=735µs   max=1.37ms   p(90)=1.24ms   p(95)=1.31ms
     http_req_tls_handshaking.......: avg=84.21ms min=0s    med=84.21ms max=168.43ms p(90)=151.59ms p(95)=160.01ms
     http_req_waiting...............: avg=1.04s   min=1.04s med=1.04s   max=1.05s    p(90)=1.05s    p(95)=1.05s
     http_reqs......................: 2       0.744745/s
     iteration_duration.............: avg=1.23s   min=1.14s med=1.23s   max=1.33s    p(90)=1.31s    p(95)=1.32s
     iterations.....................: 2       0.744745/s
     vus............................: 1       min=1      max=1
     vus_max........................: 20      min=20     max=20
```

### 레퍼런스
https://k6.io/docs/testing-guides/api-load-testing/
https://k6.io/docs/examples/single-request/

