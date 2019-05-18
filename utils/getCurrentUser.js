const getCurrentUser =  async (ctx) => {
    const token = ctx.cookies.get("token");
    
    if(!token){
        return null;
    }
    const Session = require("../models/Session");
    try {
        const user =  await Session.findOne({token}).populate('user');
        return user;
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = getCurrentUser;