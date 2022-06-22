# Step-5: Stock Empty 람다 배포

## 1. api 문서를 보고 
공장 api에 추가 생산을 요청하는 메시지를 보내는 curl을 만드세요.


## 1. Tip

curl --location --request POST 'http://factory.p3.api.codestates-devops.be:8080/manufacture' \
--header 'Content-Type: application/json' \
--data-raw '{
  "MessageGroupId": "stock-arrival-group",
  "MessageAttributeProductId": "CP-502101",
  "MessageAttributeProductCnt": 10,
  "MessageAttributeFactoryId": "FF-500293",
  "MessageAttributeRequester": "홍길동",
  "CallbackUrl": "https://rr298yy7hk.execute-api.ap-northeast-2.amazonaws.com/arrival"
}'


<pre>
추가 생산 요청 curl -> [ 공장 api ]
</pre>


## 2. day-1/step-2 의 컴슈머에서 
위의 curl에 해당하는 요청을 보내어, 최종적으로 공장에게 Stock Empty 메시지를 전달해주자.

## 2. Tip 
`day-1/step-2`에서 참조
<pre>
 curl -> producer lambda -> sqs -> comsumer labmda
</pre>


`day-1/step-4`에서 참조
<pre>
  구매요청 = curl
     |
[ 영업 api ] -> sns -> sqs
</pre>

위의 2개를 합하여 Stock Empty 인프라를 완성하자.
<pre>
  구매요청 = curl
     |
[ 영업 api ] -> sns -> sqs -> (Stock Empty labmda) -> [ 공장 api ]

</pre>