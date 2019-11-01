// sign in:
const userDao = require("../dao/UserDao");
const enc = require("../utils/encrypt");//引入加密工具
module.exports = {
    //登录
    'POST /signin': async (ctx, next) => {
        let
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';

        let user = {};
        user.userName = email;
        user.userPassword = enc.encrypt(password);
        let res = await userDao.virifyUser(user);
        if (res.success === true) {
            ctx.session.userInfo = res.data;
            ctx.response.redirect('/signinToPage');
        } else {
            ctx.render('login.html', {
                title: '登录失败',
                errorPrompt: res.msg
            });
        }
    },
    //注册
    'POST /signup': async (ctx, next) => {
        let
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        let user = {};
        user.userName = email;
        user.userPassword = await enc.encrypt(password);//密码加密保存
        let res = await userDao.addUser(user);
        if (res.success === true) {
            user = {};
            user.id = res.data;
            user.user_name = email;
            ctx.session.userInfo = user;
            ctx.response.redirect('/signupToPage');
        } else {
            ctx.render("register.html", {
                title: "用户注册",
                msg: "用户注册失败"
            })
        }
    },
    //注册跳转页面
    "GET /signupToPage": async (ctx, next) => {
        let user = ctx.session.userInfo || '';
        if (user) {
            ctx.render('signin-ok.html', {
                title: '注册成功',
            });
        } else {
            ctx.render('signin-failed.html', {
                title: '注册失败'
            });
        }
    },
    "GET /signinToPage": async (ctx, next) => {
        let user = ctx.session.userInfo || '';
        if (user) {
            ctx.render('signin-ok.html', {
                title: '登录成功',
            });
        } else {
            ctx.render('signin-failed.html', {
                title: '登录失败'
            });
        }
    },
};
