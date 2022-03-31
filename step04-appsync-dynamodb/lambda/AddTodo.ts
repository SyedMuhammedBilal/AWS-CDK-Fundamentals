import * as AWS from 'aws-sdk'
import { Todo } from './Todo';
const docClient = new AWS.DynamoDB.DocumentClient();

export const addTodo = async (todo: Todo): Promise<any> => {
    const params: any = {
        TableName: process.env.TestTableName,
        data: todo
    }
    try {
        await docClient.put(params).promise();
        return todo;
    } catch (error) {
        return error as any
    }
}