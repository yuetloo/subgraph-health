# subgraph-health

I created this tool to help diagnose issues when subgraph fails to sync.

The tool is deployed here: [https://yuetloo.github.io/subgraph-health/](https://yuetloo.github.io/subgraph-health/)

When a subgraph fails to sync, you may not always get the error message from the subgraph explorer logs. If you are not the owner of a subgraph, you may find that the logs are empty.

Details on how to check subgraph health can be found [https://thegraph.com/docs/en/developer/quick-start/#5-check-your-logs](https://thegraph.com/docs/en/developer/quick-start/#5-check-your-logs)

You can also use the GraphiQL playground (https://graphiql-online.com/graphiql) to check the logs, especially if it's the pending subgraph that failed to sync because the tool in this repo only checks current subgraph status.
