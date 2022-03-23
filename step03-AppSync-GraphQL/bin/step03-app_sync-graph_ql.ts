#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppSyncGraphQlStack } from '../lib/step03-app_sync-graph_ql-stack';

const app: any = new cdk.App();
new AppSyncGraphQlStack(app, 'AppSyncGraphQlStack');