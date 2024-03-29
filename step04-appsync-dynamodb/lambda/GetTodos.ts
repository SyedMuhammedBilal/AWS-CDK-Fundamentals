const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

export async function getTodos() {
    const params = {
        TableName: process.env.TODOS_TABLE,
    }
    try {
        const data = await docClient.scan(params).promise()
        return data.Items
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}
