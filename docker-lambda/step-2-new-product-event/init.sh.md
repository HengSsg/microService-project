 curl --location --request POST 'https://4ubv3jsfl4.execute-api.ap-northeast-2.amazonaws.com/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "MessageGroupId": "stock-empty-group",
    "subject": "도넛-스테이츠 제품 입고",
    "message": "제품 입고",
    "MessageAttributeProductId": "CP-502101",
    "MessageAttributeProductCnt": "10",
    "MessageAttributeFactoryId": "FF-500293"
}'



[
  RowDataPacket {
    product_id: '0fe26148-c218-11ec-baec-d322339a6943',
    name: '도넛-스테이츠',
    price: 19900,
    stock: 20,
    factory_id: '2b398f8a-c217-11ec-baec-d322339a6943',
    ad_id: '90d718bc-c217-11ec-baec-d322339a6943'
  }
]
The stock is:  20

                UPDATE product
                SET stock = stock + 10
                WHERE product_id = UUID_TO_BIN('0fe26148-c218-11ec-baec-d322339a6943');

상품 입고 !!


curl --location --request POST 'http://localhost:3000/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "MessageGroupId": "stock-empty-group",
    "subject": "도넛-스테이츠 제품 입고",
    "message": "제품 입고",
    "MessageAttributeProductId": "CP-502101",
    "MessageAttributeProductCnt": "10",
    "MessageAttributeFactoryId": "FF-500293"
}'
