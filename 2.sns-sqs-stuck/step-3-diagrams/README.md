# Step-3: (시나리오) 재고 관련 토픽 및 큐 준비 & 다이어그램 준비

## Day3 실제 구현을 대비하여 재고 관련 SNS 및 SQS를 준비합니다

- Sales API가 구매요청에 의해서 데이터베이스에서 재고 상황을 파악한다.
  - 재고가 있다면 감소시키고 응답으로 판매완료 내용을 전달합니다.
  - 재고가 없는 경우 공장에 주문을 진행합니다 (Day 3때 진행)
    - 재고가 없다는 내용을 담은 메세지 페이로드와 함께 SNS topic이 생성됩니다. (topic 이름: `stock_empty`)
      - 메세지가 SQS로 구현된 `stock_queue`에 수신됩니다.
        - DLQ 이름: `dead_letter_queue`

위 내용을 인프라로 구축하고, 다이어그램으로도 완성합니다.

## 참고 : 다이어그램
- https://aws.amazon.com/ko/architecture/icons/