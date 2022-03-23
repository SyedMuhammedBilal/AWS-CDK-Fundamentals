import * as cdk from "@aws-cdk/core";
import { Distribution } from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import { Bucket } from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as lambda from "@aws-cdk/aws-lambda";
import * as appsync from "@aws-cdk/aws-appsync"

export class AppSyncGraphQlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
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
      fieldName: "hello"
    })
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "myCustomMsg"
    })
  }
}
  