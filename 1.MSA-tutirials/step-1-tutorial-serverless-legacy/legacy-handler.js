// 인위적으로 처리속도를 제어하기 위해서 지연을 준다.
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const producer_consumer = async (event) => {
  let statusCode = 200 // 기본 상태코드 200
  let message;
  // start of function A
  await delay(1000); // function A 처리속도를 제어하기 위해서 지연을 준다.
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }
  // end of function A

  // start of function B
  try {
    await delay(4000); // function B 처리속도를 제어하기 위해서 지연을 준다.
    message = `Message accepted! Result: ${parseInt(JSON.parse(event.body).input) + 1}`;

  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500; 
  }
  return {
    statusCode, // 200
    body: JSON.stringify({
      message,
    }),
  };
  // end of function B

};

module.exports = {
  producer_consumer,
};
