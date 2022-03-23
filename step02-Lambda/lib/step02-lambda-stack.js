"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
class LambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        /** @dev The code that defines your stack goes here */
        const helloLambda = new lambda.Function(this, "HelloFunction", {
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 1536,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda'),
        });
        new apigw.LambdaRestApi(this, "endpoint", {
            handler: helloLambda
        });
    }
}
exports.LambdaStack = LambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAyLWxhbWJkYS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0ZXAwMi1sYW1iZGEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFFakQsTUFBYSxXQUFZLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDeEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixzREFBc0Q7UUFDdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDN0QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ3RDLENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxXQUFXO1NBQ3JCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWhCRCxrQ0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuXG5leHBvcnQgY2xhc3MgTGFtYmRhU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLyoqIEBkZXYgVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlICovIFxuICAgIGNvbnN0IGhlbGxvTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhlbGxvRnVuY3Rpb25cIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsIFxuICAgICAgbWVtb3J5U2l6ZTogMTUzNixcbiAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgfSlcblxuICAgIG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsIFwiZW5kcG9pbnRcIiwge1xuICAgICAgaGFuZGxlcjogaGVsbG9MYW1iZGFcbiAgICB9KVxuICB9XG59XG4iXX0=