"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = void 0;
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function deleteTodo(todoId) {
    const params = {
        TableName: process.env.TestTableName,
        Key: {
            id: todoId
        }
    };
    try {
        await docClient.delete(params).promise();
        return todoId;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return err;
    }
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsZXRlVG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRlbGV0ZVRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUU3QyxLQUFLLFVBQVUsVUFBVSxDQUFDLE1BQWM7SUFDM0MsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1FBQ3BDLEdBQUcsRUFBRTtZQUNELEVBQUUsRUFBRSxNQUFNO1NBQ2I7S0FDSixDQUFBO0lBQ0QsSUFBSTtRQUNBLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN4QyxPQUFPLE1BQU0sQ0FBQTtLQUNoQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNwQyxPQUFPLEdBQUcsQ0FBQTtLQUNiO0FBQ0wsQ0FBQztBQWRELGdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuY29uc3QgZG9jQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVG9kbyh0b2RvSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UZXN0VGFibGVOYW1lLFxuICAgICAgICBLZXk6IHtcbiAgICAgICAgICAgIGlkOiB0b2RvSWRcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb2NDbGllbnQuZGVsZXRlKHBhcmFtcykucHJvbWlzZSgpXG4gICAgICAgIHJldHVybiB0b2RvSWRcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIGVycm9yOiAnLCBlcnIpXG4gICAgICAgIHJldHVybiBlcnJcbiAgICB9XG59Il19