"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step04AppsyncDynamodbStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const appsync = require("@aws-cdk/aws-appsync");
const dynamoDB = require("@aws-cdk/aws-dynamodb");
class Step04AppsyncDynamodbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new appsync.GraphqlApi(this, 'Api', {
            name: 'demo',
            schema: appsync.Schema.fromAsset('graphql/schema.gql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY,
                },
            }
        });
        new cdk.CfnOutput(this, "GraphQLApiEndpoint", {
            value: api.graphqlUrl
        });
        new cdk.CfnOutput(this, 'GraphQLApiKey', {
            value: api.apiKey || 'no Api key provided'
        });
        const lambdaFuntion = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'index.handler',
            memorySize: 1536,
            /** @dev duration to run Lambda function (time also charge bill) */
            timeout: cdk.Duration.seconds(10)
        });
        /** @dev set lambda as a data-source */
        const lambda_data_source = api.addLambdaDataSource("lambdaDatasource", lambdaFuntion);
        /** @dev describing resolver for data-source */
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getTodos"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "addTodo"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateTodo"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "deleteTodo"
        });
        const todoTable = new dynamoDB.Table(this, 'TestTable', {
            partitionKey: {
                name: 'id',
                type: dynamoDB.AttributeType.STRING
            }
        });
        todoTable.grantFullAccess(lambdaFuntion);
        lambdaFuntion.addEnvironment('TestTableName', todoTable.tableName);
    }
}
exports.Step04AppsyncDynamodbStack = Step04AppsyncDynamodbStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDA0LWFwcHN5bmMtZHluYW1vZGItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwMDQtYXBwc3luYy1keW5hbW9kYi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFLckMsOENBQThDO0FBQzlDLGdEQUErQztBQUMvQyxrREFBaUQ7QUFDakQsTUFBYSwwQkFBMkIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN2RCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzlDLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQ3RELG1CQUFtQixFQUFFO2dCQUNuQixvQkFBb0IsRUFBRTtvQkFDcEIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU87aUJBQ3JEO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzVDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxxQkFBcUI7U0FDM0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDakUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLG1FQUFtRTtZQUNuRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILHVDQUF1QztRQUN2QyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV0RiwrQ0FBK0M7UUFDL0Msa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxVQUFVO1NBQ3RCLENBQUMsQ0FBQTtRQUNGLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsU0FBUztTQUNyQixDQUFDLENBQUE7UUFDRixrQkFBa0IsQ0FBQyxjQUFjLENBQUM7WUFDaEMsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFBO1FBQ0Ysa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLE1BQU0sU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3RELFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6QyxhQUFhLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFckUsQ0FBQztDQUNGO0FBL0RELGdFQStEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgRGlzdHJpYnV0aW9uIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jbG91ZGZyb250XCI7XG5pbXBvcnQgKiBhcyBvcmlnaW5zIGZyb20gXCJAYXdzLWNkay9hd3MtY2xvdWRmcm9udC1vcmlnaW5zXCI7XG5pbXBvcnQgeyBCdWNrZXQgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLXMzXCI7XG5pbXBvcnQgKiBhcyBzM2RlcGxveSBmcm9tIFwiQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnRcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwcHN5bmNcIlxuaW1wb3J0ICogYXMgZHluYW1vREIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJ1xuZXhwb3J0IGNsYXNzIFN0ZXAwNEFwcHN5bmNEeW5hbW9kYlN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ0FwaScsIHtcbiAgICAgIG5hbWU6ICdkZW1vJyxcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdncmFwaHFsL3NjaGVtYS5ncWwnKSxcbiAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcbiAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5BUElfS0VZLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJHcmFwaFFMQXBpRW5kcG9pbnRcIiwge1xuICAgICAgdmFsdWU6IGFwaS5ncmFwaHFsVXJsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnR3JhcGhRTEFwaUtleScsIHtcbiAgICAgIHZhbHVlOiBhcGkuYXBpS2V5IHx8ICdubyBBcGkga2V5IHByb3ZpZGVkJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhRnVudGlvbjogYW55ID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnTXlGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIG1lbW9yeVNpemU6IDE1MzYsXG4gICAgICAvKiogQGRldiBkdXJhdGlvbiB0byBydW4gTGFtYmRhIGZ1bmN0aW9uICh0aW1lIGFsc28gY2hhcmdlIGJpbGwpICovXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMClcbiAgICB9KTtcblxuICAgIC8qKiBAZGV2IHNldCBsYW1iZGEgYXMgYSBkYXRhLXNvdXJjZSAqL1xuICAgIGNvbnN0IGxhbWJkYV9kYXRhX3NvdXJjZSA9IGFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFwibGFtYmRhRGF0YXNvdXJjZVwiLCBsYW1iZGFGdW50aW9uKTtcblxuICAgIC8qKiBAZGV2IGRlc2NyaWJpbmcgcmVzb2x2ZXIgZm9yIGRhdGEtc291cmNlICovXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXG4gICAgICBmaWVsZE5hbWU6IFwiZ2V0VG9kb3NcIlxuICAgIH0pXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICBmaWVsZE5hbWU6IFwiYWRkVG9kb1wiXG4gICAgfSlcbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJ1cGRhdGVUb2RvXCJcbiAgICB9KVxuICAgIGxhbWJkYV9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxuICAgICAgZmllbGROYW1lOiBcImRlbGV0ZVRvZG9cIlxuICAgIH0pXG5cbiAgICBjb25zdCB0b2RvVGFibGUgPSBuZXcgZHluYW1vREIuVGFibGUodGhpcywgJ1Rlc3RUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiBkeW5hbW9EQi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9kb1RhYmxlLmdyYW50RnVsbEFjY2VzcyhsYW1iZGFGdW50aW9uKTtcbiAgICBsYW1iZGFGdW50aW9uLmFkZEVudmlyb25tZW50KCdUZXN0VGFibGVOYW1lJywgdG9kb1RhYmxlLnRhYmxlTmFtZSk7XG4gICAgXG4gIH1cbn1cbiJdfQ==