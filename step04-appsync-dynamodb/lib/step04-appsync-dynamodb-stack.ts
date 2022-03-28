import * as cdk from "@aws-cdk/core";
import { Distribution } from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import { Bucket } from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as lambda from "@aws-cdk/aws-lambda";
import * as appsync from "@aws-cdk/aws-appsync"
import * as dynamoDB from '@aws-cdk/aws-dynamodb'
export class Step04AppsyncDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
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

    const lambdaFuntion: any = new lambda.Function(this, 'MyFunction', {
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
    })
    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo"
    })

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
