const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
const sns = new AWS.SNS({ credentials: credentials, region: 'ap-northeast-2' });

const port = 3000;

app.use(express.json());

app.get('/status', (req, res) => res.json({ status: "ok", sns: sns }));
app.post('/send', (req, res) => {
    console.log(req.body)
    let now = new Date().toString();
    let email = `${req.body.message} \n \n This was sent: ${now}`;
    let params = {
        Message: email,
        MessageGroupId: req.body.MessageGroupId,
        MessageDeduplicationId: new Date().getTime().toString(),
        Subject: req.body.subject,
        MessageAttributes: {
            "ProductId": {
                "StringValue": req.body.MessageAttributeProductId
                , "DataType": "String"
            },
            "FactoryId": {
                "StringValue": req.body.MessageAttributeFactoryId
                , "DataType": "String"
            }
        },
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessage-property
        TopicArn: "arn:aws:sns:ap-northeast-2:728116505069:mytopic1.fifo" // sns의 arn을 입력한다.
    };

    sns.publish(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
        return res.status(200).send({ message: 'ok' });
    });
});
app.listen(port, () => console.log(`SNS App listening on port ${port}!`));
