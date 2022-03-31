const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

export async function getTodos() {
    const params = {
        TableName: process.env.TestTableName,
    }
    try {
        const data = await docClient.scan(params).promise()
        return data.data
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return err
    }
}
