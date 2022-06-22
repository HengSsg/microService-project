## 1. aws rds mysql 서비스 생성, 스키마 설정, 외부 포트 오픈
https://app.quickdatabasediagrams.com/#/d/9vrfS3

스키마 설정은 init.sql을 참고하세요.

## 2. index.js 설정 및 실행

FILL_ME_IN을 채워넣거나, 환경변수로 분리해서 실행하세요.

```
$ node ./index.js

SNS App listening on port 3000!
```

## 3. 로컬에서 curl을 이용해 구매 요청 테스트

```
$ curl --location --request POST 'http://localhost:3000/send' --header 'Content-Type: application/json' --data-raw '{   "MessageGroupId": "stock-empty-group",    "subject": "부산도너츠 재고 부족",  "message": "재고 부족",    "MessageAttributeProductId": "CP-502101",    "MessageAttributeFactoryId": "FF-500293"}'

{"message":"재고부족, 제품 생산 요청!"}%
```

## 4. 재고 부족 상황시, 알림 전송

```
{
  MessageGroupId: 'stock-empty-group',
  subject: '부산도너츠 재고 부족',
  message: '재고 부족',
  MessageAttributeProductId: 'CP-502101',
  MessageAttributeFactoryId: 'FF-500293'
}
재고 부족 상황!!
{
  ResponseMetadata: { RequestId: 'a7066312-be66-52bc-905a-39cecb5ac517' },
  MessageId: '569b0a8e-97a3-51dc-b1a3-5052e29fd677',
  SequenceNumber: '10000000000000049000'
}
```

## 5. (advanced) Sale API 서버 배포

AWS lambda 또는 EC2 이용