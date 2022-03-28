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
            fieldName: "getTodo"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "addTodo"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDA0LWFwcHN5bmMtZHluYW1vZGItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwMDQtYXBwc3luYy1keW5hbW9kYi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFLckMsOENBQThDO0FBQzlDLGdEQUErQztBQUMvQyxrREFBaUQ7QUFDakQsTUFBYSwwQkFBMkIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN2RCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzlDLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQ3RELG1CQUFtQixFQUFFO2dCQUNuQixvQkFBb0IsRUFBRTtvQkFDcEIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU87aUJBQ3JEO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzVDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxxQkFBcUI7U0FDM0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDakUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLG1FQUFtRTtZQUNuRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILHVDQUF1QztRQUN2QyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV0RiwrQ0FBK0M7UUFDL0Msa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxTQUFTO1NBQ3JCLENBQUMsQ0FBQTtRQUNGLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsU0FBUztTQUNyQixDQUFDLENBQUE7UUFFRixNQUFNLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUN0RCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUNwQztTQUNGLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXJFLENBQUM7Q0FDRjtBQXZERCxnRUF1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IERpc3RyaWJ1dGlvbiB9IGZyb20gXCJAYXdzLWNkay9hd3MtY2xvdWRmcm9udFwiO1xuaW1wb3J0ICogYXMgb3JpZ2lucyBmcm9tIFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQtb3JpZ2luc1wiO1xuaW1wb3J0IHsgQnVja2V0IH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1zM1wiO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSBcIkBhd3MtY2RrL2F3cy1zMy1kZXBsb3ltZW50XCI7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcHBzeW5jXCJcbmltcG9ydCAqIGFzIGR5bmFtb0RCIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYidcbmV4cG9ydCBjbGFzcyBTdGVwMDRBcHBzeW5jRHluYW1vZGJTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdBcGknLCB7XG4gICAgICBuYW1lOiAnZGVtbycsXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldCgnZ3JhcGhxbC9zY2hlbWEuZ3FsJyksXG4gICAgICBhdXRob3JpemF0aW9uQ29uZmlnOiB7XG4gICAgICAgIGRlZmF1bHRBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGFwcHN5bmMuQXV0aG9yaXphdGlvblR5cGUuQVBJX0tFWSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiR3JhcGhRTEFwaUVuZHBvaW50XCIsIHtcbiAgICAgIHZhbHVlOiBhcGkuZ3JhcGhxbFVybFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0dyYXBoUUxBcGlLZXknLCB7XG4gICAgICB2YWx1ZTogYXBpLmFwaUtleSB8fCAnbm8gQXBpIGtleSBwcm92aWRlZCdcbiAgICB9KTtcblxuICAgIGNvbnN0IGxhbWJkYUZ1bnRpb246IGFueSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ015RnVuY3Rpb24nLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBtZW1vcnlTaXplOiAxNTM2LFxuICAgICAgLyoqIEBkZXYgZHVyYXRpb24gdG8gcnVuIExhbWJkYSBmdW5jdGlvbiAodGltZSBhbHNvIGNoYXJnZSBiaWxsKSAqL1xuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTApXG4gICAgfSk7XG5cbiAgICAvKiogQGRldiBzZXQgbGFtYmRhIGFzIGEgZGF0YS1zb3VyY2UgKi9cbiAgICBjb25zdCBsYW1iZGFfZGF0YV9zb3VyY2UgPSBhcGkuYWRkTGFtYmRhRGF0YVNvdXJjZShcImxhbWJkYURhdGFzb3VyY2VcIiwgbGFtYmRhRnVudGlvbik7XG5cbiAgICAvKiogQGRldiBkZXNjcmliaW5nIHJlc29sdmVyIGZvciBkYXRhLXNvdXJjZSAqL1xuICAgIGxhbWJkYV9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcImdldFRvZG9cIlxuICAgIH0pXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICBmaWVsZE5hbWU6IFwiYWRkVG9kb1wiXG4gICAgfSlcblxuICAgIGNvbnN0IHRvZG9UYWJsZSA9IG5ldyBkeW5hbW9EQi5UYWJsZSh0aGlzLCAnVGVzdFRhYmxlJywge1xuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgIHR5cGU6IGR5bmFtb0RCLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0b2RvVGFibGUuZ3JhbnRGdWxsQWNjZXNzKGxhbWJkYUZ1bnRpb24pO1xuICAgIGxhbWJkYUZ1bnRpb24uYWRkRW52aXJvbm1lbnQoJ1Rlc3RUYWJsZU5hbWUnLCB0b2RvVGFibGUudGFibGVOYW1lKTtcbiAgICBcbiAgfVxufVxuIl19