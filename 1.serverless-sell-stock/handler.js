const serverless = require("serverless-http");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const sns = new AWS.SNS();

app.use(express.json());
app.post("/send", (req, res) => {
  console.log("@@@:",req.body)
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    // RDS에서 DB를 생성하고 연결하세요.
    host: process.env.HOST_RDS,
    user: process.env.USER_RDS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_RDS
  });
  connection.query(
    `
    SELECT
        BIN_TO_UUID(product_id) as product_id
        , name, price, stock, BIN_TO_UUID(factory_id), BIN_TO_UUID(ad_id)
    FROM product
    WHERE sku = '${req.body.MessageAttributeProductId}';
    `,
function (error, results, fields) {
  if (error) throw error;
  if (results[0].stock > 0) {
    console.log(results);
    console.log("The stock is: ", results[0].stock);
    const sql = `
            UPDATE product
            SET stock = ${results[0].stock - 1}
            WHERE product_id = UUID_TO_BIN('${results[0].product_id}');
            `;
    console.log(sql);
    connection.query(sql, function (error, results2, fields) {
      if (error) throw error;
    });
    console.log("재고 감소 !!");
    return res.status(200).send({ message: "판매완료" });
  } else {
    console.log("재고 부족 상황!!");
    console.log(req.body);
    let now = new Date().toString();
    let email = `${req.body.message} \n \n This was sent: ${now}`;
    let params = {
      Message: email,
      MessageGroupId: req.body.MessageGroupId,
      MessageDeduplicationId: new Date().getTime().toString(),
      Subject: req.body.subject,
      MessageAttributes: {
        ProductId: {
          StringValue: req.body.MessageAttributeProductId,
          DataType: "String",
        },
        FactoryId: {
          StringValue: req.body.MessageAttributeFactoryId,
          DataType: "String",
        },
      },
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessage-property
      TopicArn: 'arn:aws:sns:ap-northeast-2:568004044946:stuck.fifo'

    };
sns.publish(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
      return res.status(200).send({ message: "재고부족, 제품 생산 요청!" });
    });
  }
}
);
});

module.exports.handler = serverless(app);
