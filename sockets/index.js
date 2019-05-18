const { updateBalanceByHashes } = require("./balances");

function registerSockets(sockect){
    updateBalanceByHashes(sockect);
}

module.exports = registerSockets;