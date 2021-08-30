# subgraph-health

I created this tool to help diagnose issues when subgraph fails to sync. When a subgraph fails to sync, you may not always get the error message from the subgraph explorer logs. If you are not the owner of a subgraph, you may find that the logs are empty.

Details on how to check subgraph health can be found [here](https://thegraph.com/docs/legacyexplorer/deploy-subgraph-hosted#checking-subgraph-health)

The full schema for the endpoint can be found [here](https://github.com/graphprotocol/graph-node/blob/master/server/websocket/src/connection.rs)