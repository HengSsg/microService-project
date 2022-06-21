"use strict";
const axios = require("axios");

const Stock_Empty = async (event) => {
  let newevent = JSON.parse(event.Records[0].body)
  console.log(event);
  console.log("event : ", newevent);

  axios.post('http://factory.p3.api.codestates-devops.be:8080/api/manufactures',{
      "MessageGroupId": 'stock-arrival-group',
      "MessageAttributeProductId": 'CP-502101',
      "MessageAttributeProductCnt": 10,
      "MessageAttributeFactoryId": 'FF-500293',
      "MessageAttributeRequester": '박형석',
      "CallbackUrl": 'https://4ubv3jsfl4.execute-api.ap-northeast-2.amazonaws.com/send'
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
