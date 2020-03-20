// sign in:
const userDao = require("../service/user_service");
module.exports = {
    //登录
    'POST /signin': async (ctx, next) => {
        let res = await userDao.verifyUser(ctx.request);
        if (res.success === true) {
            ctx.session.userToken = res.data;
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
        let res = await userDao.addUser(ctx.request);
        if (res.success === true) {
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
        let user = ctx.session.userToken || '';
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
        let user = ctx.session.userToken || '';
        if (user) {
            ctx.render('signin-ok.html', {
                title: '登录成功',
                user: user
            });
        } else {
            ctx.render('signin-failed.html', {
                title: '登录失败'
            });
        }
    },
};
