'use strict';

const AWS = require('aws-sdk');

// aws sqs send-message --region us-east-1 --endpoint-url https://sqs.us-east-1.amazonaws.com/ --queue-url https://sqs.us-east-1.amazonaws.com/767155179185/NewsOpenAtQueue --message-body "Hello from Amazon SQS."
// aws sqs send-message --region us-east-1 --queue-url https://sqs.us-east-1.amazonaws.com/767155179185/NewsOpenAtQueue --message-body "Hello from Amazon SQS."

// Configure the region
AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/767155179185/NewsOpenAtQueue';

const sqsSampleMessage = {
  newsId: '3',
  openAt: '11:00',
};

const sqsSampleData = {
  MessageAttributes: {
    newsId: { DataType: 'String', StringValue: sqsSampleMessage.newsId },
    openAt: { DataType: 'String', StringValue: sqsSampleMessage.openAt },
  },
  MessageBody: JSON.stringify(sqsSampleMessage),

  QueueUrl: queueUrl,
};
const sendMessageToSQS = () => {
  let sendSqsMessage = sqs.sendMessage(sqsSampleData).promise();

  sendSqsMessage
    .then((data) => {
      console.log(`SUCCESS: ${data.MessageId}`);
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
};

sendMessageToSQS();

// [GET]/news