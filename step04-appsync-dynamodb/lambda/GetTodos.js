"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = void 0;
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function getTodos() {
    const params = {
        TableName: process.env.TestTableName,
    };
    try {
        const data = await docClient.scan(params).promise();
        return data.data;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return err;
    }
}
exports.getTodos = getTodos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0VG9kb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHZXRUb2Rvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRTdDLEtBQUssVUFBVSxRQUFRO0lBQzFCLE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYTtLQUN2QyxDQUFBO0lBQ0QsSUFBSTtRQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7S0FDbkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDcEMsT0FBTyxHQUFHLENBQUE7S0FDYjtBQUNMLENBQUM7QUFYRCw0QkFXQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRvZG9zKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UZXN0VGFibGVOYW1lLFxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jQ2xpZW50LnNjYW4ocGFyYW1zKS5wcm9taXNlKClcbiAgICAgICAgcmV0dXJuIGRhdGEuZGF0YVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRHluYW1vREIgZXJyb3I6ICcsIGVycilcbiAgICAgICAgcmV0dXJuIGVyclxuICAgIH1cbn1cbiJdfQ==