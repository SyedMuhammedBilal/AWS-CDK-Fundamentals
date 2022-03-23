#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaStack } from '../lib/step02-lambda-stack';

const app = new cdk.App();
new LambdaStack(app, 'LambdaStack', {

});