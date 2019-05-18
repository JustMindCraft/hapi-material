const level = require("level");
const db = level("cache.db");

async function setSession(token, key, value){
    let tokenCount = 0;
    try {
        tokenCount = await db.get(token+"_count")
    } catch (error) {
        console.log(error);
        
        tokenCount = 0;
    }
    
    console.log(tokenCount);
    
    tokenCount++;
    await db.put(token+key, value);
    return  await db.put(token+"_count", tokenCount);
}

async function getSession(token, key){
    return await db.get(token+key);
}

module.exports = {
    setSession, 
    getSession,
}