#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const step03_app_sync_graph_ql_stack_1 = require("../lib/step03-app_sync-graph_ql-stack");
const app = new cdk.App();
new step03_app_sync_graph_ql_stack_1.AppSyncGraphQlStack(app, 'AppSyncGraphQlStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAzLWFwcF9zeW5jLWdyYXBoX3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RlcDAzLWFwcF9zeW5jLWdyYXBoX3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMsMEZBQTRFO0FBRTVFLE1BQU0sR0FBRyxHQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CLElBQUksb0RBQW1CLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBBcHBTeW5jR3JhcGhRbFN0YWNrIH0gZnJvbSAnLi4vbGliL3N0ZXAwMy1hcHBfc3luYy1ncmFwaF9xbC1zdGFjayc7XG5cbmNvbnN0IGFwcDogYW55ID0gbmV3IGNkay5BcHAoKTtcbm5ldyBBcHBTeW5jR3JhcGhRbFN0YWNrKGFwcCwgJ0FwcFN5bmNHcmFwaFFsU3RhY2snKTsiXX0=