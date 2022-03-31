const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

export async function deleteTodo(todoId: string) {
    const params = {
        TableName: process.env.TestTableName,
        Key: {
            id: todoId
        }
    }
    try {
        await docClient.delete(params).promise()
        return todoId
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return err
    }
}