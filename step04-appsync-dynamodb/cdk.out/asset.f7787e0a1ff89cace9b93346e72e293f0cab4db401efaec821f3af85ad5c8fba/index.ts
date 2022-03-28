import * as AWS from 'aws-sdk'
const docClient = new AWS.DynamoDB.DocumentClient();

type AppSyncEvent = {
    info: {
        fieldName: string
    }
    arguments: {
        id: string,
        description: string
    }
}

exports.handler = async (event: AppSyncEvent) => {
    if (event.info.fieldName === 'getTodo') {
        /** @dev get todo from id */
        return await getTodo(event.arguments.id);
    } else if (event.info.fieldName === 'addTodo') {
        /** @dev add todo with description */
        return await addTodo(event.arguments.description);
    } else {
        return 'server error'
    }
}

const addTodo = async (desc: string): Promise<any> => {
    const params: any = {
        TableName: process.env.TestTableName,
        Item: desc
    }
    try {
        const response: any = await docClient.put(params).promise();
        return response?.Attributes['id'] || '';
    } catch (error) {
        return error as any
    }
}

const getTodo = async (id: string): Promise<any> => {
    const params: any = {
        TableName: process.env.TestTableName,
        Item: id
    }
    try {
        const response = await docClient.scan(params).promise();
        return response;
    } catch (error) {
        return error as any
    }
}
