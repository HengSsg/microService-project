const { SQS } = require("aws-sdk");

// 인위적으로 처리속도를 제어하기 위해서 지연을 준다.
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
const sqs = new SQS();

const producer = async (event) => {
  let statusCode = 200
  let message;
  await delay(1000); // function A 처리속도를 제어하기 위해서 지연을 준다.
  if (!event.body) {  // body가 없으면 404 not found를 리턴한다.
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  try {  //body가 있으면 sqs에 큐를 보낸다. 
    await sqs
      .sendMessage({
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: event.body
      })
      .promise();

    message = `Message accepted!`;
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

const consumer = async (event) => { //  sqs에 메세지가 들어오게되면 트리거가 되어 메세지를 소비하며 input값을 파싱하여 숫자형으로 만들고 그 값에 1을 더한다.
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);
    await delay(4000); // function B 처리속도를 제어하기 위해서 지연을 준다.
    const message = `Message accepted! Result: ${parseInt(JSON.parse(record.body).input) + 1}`;
    console.log(message);
  }
};

module.exports = {
  producer,
  consumer,
};
