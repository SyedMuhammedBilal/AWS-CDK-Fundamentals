"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSyncGraphQlStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const appsync = require("@aws-cdk/aws-appsync");
class AppSyncGraphQlStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // /** @dev The code that defines your stack goes here */
        // /** @dev initialize s3 bucket */
        // const webBucket = new Bucket(this, "webBucket", {
        //   versioned: true,
        // })
        // const distribution = new Distribution(this, 'webDistribution', {
        //   /** @dev approching to s3 bucket */
        //   defaultBehavior: {
        //     origin: new origins.S3Origin(webBucket)
        //   },
        //   /** @dev root of file to access after hiting the endpoint */
        //   defaultRootObject: "index.html"
        // });
        // new cdk.CfnOutput(this, "DistributionDomainName", {
        //   /** @dev creating domain for distribution */
        //   value: distribution.domainName
        // })
        // /** @dev deploying all distribution on s3 */
        // new s3deploy.BucketDeployment(this, 'deployWebsite', {
        //   sources: [s3deploy.Source.asset('./client')],
        //   destinationBucket: webBucket,
        //   /** @dev linking with the URL */
        //   distribution,
        //   distributionPaths: ["/*"],
        // }) 
        const api = new appsync.GraphqlApi(this, 'Api', {
            name: 'demo',
            schema: appsync.Schema.fromAsset('graphql/schema.gql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.IAM,
                },
            }
        });
        new cdk.CfnOutput(this, "GraphQLApi", {
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
            fieldName: "hello"
        });
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "myCustomMsg"
        });
    }
}
exports.AppSyncGraphQlStack = AppSyncGraphQlStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAzLWFwcF9zeW5jLWdyYXBoX3FsLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RlcDAzLWFwcF9zeW5jLWdyYXBoX3FsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUtyQyw4Q0FBOEM7QUFDOUMsZ0RBQStDO0FBRS9DLE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix5REFBeUQ7UUFDekQsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsS0FBSztRQUVMLG1FQUFtRTtRQUNuRSx3Q0FBd0M7UUFDeEMsdUJBQXVCO1FBQ3ZCLDhDQUE4QztRQUM5QyxPQUFPO1FBQ1AsaUVBQWlFO1FBQ2pFLG9DQUFvQztRQUNwQyxNQUFNO1FBRU4sc0RBQXNEO1FBQ3RELGlEQUFpRDtRQUNqRCxtQ0FBbUM7UUFDbkMsS0FBSztRQUVMLCtDQUErQztRQUMvQyx5REFBeUQ7UUFDekQsa0RBQWtEO1FBQ2xELGtDQUFrQztRQUNsQyxxQ0FBcUM7UUFDckMsa0JBQWtCO1FBQ2xCLCtCQUErQjtRQUMvQixNQUFNO1FBRU4sTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDOUMsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7WUFDdEQsbUJBQW1CLEVBQUU7Z0JBQ25CLG9CQUFvQixFQUFFO29CQUNwQixpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRztpQkFDakQ7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3BDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxxQkFBcUI7U0FDM0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDakUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLG1FQUFtRTtZQUNuRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILHVDQUF1QztRQUN2QyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV0RiwrQ0FBK0M7UUFDL0Msa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQTtRQUNGLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsYUFBYTtTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUF6RUQsa0RBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBEaXN0cmlidXRpb24gfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnRcIjtcbmltcG9ydCAqIGFzIG9yaWdpbnMgZnJvbSBcIkBhd3MtY2RrL2F3cy1jbG91ZGZyb250LW9yaWdpbnNcIjtcbmltcG9ydCB7IEJ1Y2tldCB9IGZyb20gXCJAYXdzLWNkay9hd3MtczNcIjtcbmltcG9ydCAqIGFzIHMzZGVwbG95IGZyb20gXCJAYXdzLWNkay9hd3MtczMtZGVwbG95bWVudFwiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gXCJAYXdzLWNkay9hd3MtYXBwc3luY1wiXG5cbmV4cG9ydCBjbGFzcyBBcHBTeW5jR3JhcGhRbFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIC8qKiBAZGV2IFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZSAqL1xuICAgIC8vIC8qKiBAZGV2IGluaXRpYWxpemUgczMgYnVja2V0ICovXG4gICAgLy8gY29uc3Qgd2ViQnVja2V0ID0gbmV3IEJ1Y2tldCh0aGlzLCBcIndlYkJ1Y2tldFwiLCB7XG4gICAgLy8gICB2ZXJzaW9uZWQ6IHRydWUsXG4gICAgLy8gfSlcblxuICAgIC8vIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBEaXN0cmlidXRpb24odGhpcywgJ3dlYkRpc3RyaWJ1dGlvbicsIHtcbiAgICAvLyAgIC8qKiBAZGV2IGFwcHJvY2hpbmcgdG8gczMgYnVja2V0ICovXG4gICAgLy8gICBkZWZhdWx0QmVoYXZpb3I6IHtcbiAgICAvLyAgICAgb3JpZ2luOiBuZXcgb3JpZ2lucy5TM09yaWdpbih3ZWJCdWNrZXQpXG4gICAgLy8gICB9LFxuICAgIC8vICAgLyoqIEBkZXYgcm9vdCBvZiBmaWxlIHRvIGFjY2VzcyBhZnRlciBoaXRpbmcgdGhlIGVuZHBvaW50ICovXG4gICAgLy8gICBkZWZhdWx0Um9vdE9iamVjdDogXCJpbmRleC5odG1sXCJcbiAgICAvLyB9KTtcblxuICAgIC8vIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiRGlzdHJpYnV0aW9uRG9tYWluTmFtZVwiLCB7XG4gICAgLy8gICAvKiogQGRldiBjcmVhdGluZyBkb21haW4gZm9yIGRpc3RyaWJ1dGlvbiAqL1xuICAgIC8vICAgdmFsdWU6IGRpc3RyaWJ1dGlvbi5kb21haW5OYW1lXG4gICAgLy8gfSlcblxuICAgIC8vIC8qKiBAZGV2IGRlcGxveWluZyBhbGwgZGlzdHJpYnV0aW9uIG9uIHMzICovXG4gICAgLy8gbmV3IHMzZGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgJ2RlcGxveVdlYnNpdGUnLCB7XG4gICAgLy8gICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KCcuL2NsaWVudCcpXSxcbiAgICAvLyAgIGRlc3RpbmF0aW9uQnVja2V0OiB3ZWJCdWNrZXQsXG4gICAgLy8gICAvKiogQGRldiBsaW5raW5nIHdpdGggdGhlIFVSTCAqL1xuICAgIC8vICAgZGlzdHJpYnV0aW9uLFxuICAgIC8vICAgZGlzdHJpYnV0aW9uUGF0aHM6IFtcIi8qXCJdLFxuICAgIC8vIH0pIFxuICAgIFxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ0FwaScsIHtcbiAgICAgIG5hbWU6ICdkZW1vJyxcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdncmFwaHFsL3NjaGVtYS5ncWwnKSxcbiAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcbiAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5JQU0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkdyYXBoUUxBcGlcIiwge1xuICAgICAgdmFsdWU6IGFwaS5ncmFwaHFsVXJsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnR3JhcGhRTEFwaUtleScsIHtcbiAgICAgIHZhbHVlOiBhcGkuYXBpS2V5IHx8ICdubyBBcGkga2V5IHByb3ZpZGVkJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhRnVudGlvbjogYW55ID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnTXlGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIG1lbW9yeVNpemU6IDE1MzYsXG4gICAgICAvKiogQGRldiBkdXJhdGlvbiB0byBydW4gTGFtYmRhIGZ1bmN0aW9uICh0aW1lIGFsc28gY2hhcmdlIGJpbGwpICovXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMClcbiAgICB9KTtcblxuICAgIC8qKiBAZGV2IHNldCBsYW1iZGEgYXMgYSBkYXRhLXNvdXJjZSAqL1xuICAgIGNvbnN0IGxhbWJkYV9kYXRhX3NvdXJjZSA9IGFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFwibGFtYmRhRGF0YXNvdXJjZVwiLCBsYW1iZGFGdW50aW9uKTtcblxuICAgIC8qKiBAZGV2IGRlc2NyaWJpbmcgcmVzb2x2ZXIgZm9yIGRhdGEtc291cmNlICovXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXG4gICAgICBmaWVsZE5hbWU6IFwiaGVsbG9cIlxuICAgIH0pXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXG4gICAgICBmaWVsZE5hbWU6IFwibXlDdXN0b21Nc2dcIlxuICAgIH0pXG4gIH1cbn1cbiAgIl19