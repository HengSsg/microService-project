"use strict";
const axios = require("axios");

const Stock_Empty = async (event) => {
  console.log(event);

  axios.post('https://2jyfnbjflf.execute-api.ap-northeast-2.amazonaws.com/send',{
    "MessageGroupId": "stock-empty-group",
    "subject": "도넛-스테이츠 제품 입고",
    "message": "제품 입고",
    "MessageAttributeProductId": "CP-502101",
    "MessageAttributeProductCnt": "10",
    "MessageAttributeFactoryId": "FF-500293"
      // "CallbackUrl": 'https://4ubv3jsfl4.execute-api.ap-northeast-2.amazonaws.com/send'
  }).then((res)=>{
      console.log(res)
      //console.log(res.data)
      console.log("보내짐!!")
  }).catch(error => {
      console.log(error);
  });
}

module.exports = {
  Stock_Empty,
}
