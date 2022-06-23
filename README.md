# microService-project
서버리스 프레임워크를 이용한 프로젝트 입니다.

**물건을 판매하다가 만약 재고가 부족하게 된다면 재고 요청을 하여 다시 재고가 쌓일 수 있게 하는 기능을 비동기적으로 구현하였습니다.**

- 유저는 물건을 구매할 때 재고가 남아있으면 구매를 할 수 있습니다.
- 만약 재고부족 상황이 발생한다면 메시지 큐를 이용해 비동기적으로 처리할 수 있습니다.
- 공장 API에서 물건이 생산완료가 되었다고 하면 콜백을 통해 데이터베이스에 재고가 쌓이게 됩니다.
- 
## Architecture
![ghghghg drawio (1)](https://user-images.githubusercontent.com/97237728/175244334-1b833246-4670-4f92-8c9b-e8b586a0f146.png)

## curl
```bash
## 사용자가 구매요청을 했을 때

$ curl --location --request POST 'https://advlhk8k0l.execute-api.ap-northeast-2.amazonaws.com/send' \ 
--header 'Content-Type: application/json' \
--data-raw '{
    "MessageGroupId": "stock-empty-group",
    "subject": "부산도너츠 재고 부족",
    "message": "재고 부족",  
    "MessageAttributeProductId": "CP-502101", 
    "MessageAttributeFactoryId": "FF-500293"
}'
```

```bash
## 재고 부족 상황시, 알림 전송

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

```bash
## 재고 조달을 요청할 때

$ curl --location --request POST 'https://vyl6qug9z9.execute-api.ap-northeast-2.amazonaws.com/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "MessageGroupId": "stock-empty-group",
    "subject": "도넛-스테이츠 제품 입고",
    "message": "제품 입고",
    "MessageAttributeProductId": "CP-502101",
    "MessageAttributeProductCnt": "10",
    "MessageAttributeFactoryId": "FF-500293"
}'
```
