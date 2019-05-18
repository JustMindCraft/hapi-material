const Router = require('koa-router')
const router = new Router();

const home = require('./pages/home');
const register = require('./pages/register');
const admin  = require('./pages/admin');
const login = require('./pages/login');
const personal = require('./pages/personal');
const likeu = require('./likeu');
const posts = require('./pages/posts');

//api
const minersApi = require('./apis/miners');
const videosApi = require('./apis/videos');


const app = require("../NextApp");
const ueditor = require('koa2-ueditor');

router.all('/editor/controller', ueditor(['./public', {
    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".mp4"],
    "imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{filename}"  
}]));

home(router);
register(router);
admin(router);
login(router);
personal(router);
likeu(router);
videosApi(router);
posts(router);

//api
minersApi(router)

router.get('*', async ctx => {
    await app.render(ctx.req, ctx.res, '/404', ctx.query);
    ctx.respond = false;
});



module.exports = router;

