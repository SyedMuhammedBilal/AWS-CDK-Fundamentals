import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /** @dev The code that defines your stack goes here */ 
    const helloLambda = new lambda.Function(this, "HelloFunction", {
      runtime: lambda.Runtime.NODEJS_14_X, 
      memorySize: 1536,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda'),
    })

    new apigw.LambdaRestApi(this, "endpoint", {
      handler: helloLambda
    })
  }
}
