const Miner = require("../models/Miner");

function updateBalanceByHashes(socket){
    let random = Math.random();
    socket.emit('update_balance', { random });
    socket.on('update_balance', async (data) => {
      
      if(random === data.random){
        const { hash, minerId } = data;
        
        if(hash !== 0){
          const { balance, miner } = await Miner.updateByHash(hash, minerId);
          random = Math.random();
          return socket.emit('update_balance', { random, balanceAmount: balance.amount, cost: miner.cost, msg: "success" } );
        }
        
      }else{
        random = Math.random();
        return socket.emit('update_balance', { error: "非法请求", random });
      }
      random = Math.random();
      return socket.emit('update_balance', { random, msg: "noknow"  });
      
    });
}

module.exports = {
    updateBalanceByHashes,
}