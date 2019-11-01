// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: '欣赏blob',
            user:ctx.session.userInfo
        });
    },
    'GET /logout': async (ctx, next) => {
        ctx.session.userInfo = null;
        ctx.render('index.html', {
            title: '欣赏blob',
        });
    },
    'GET /login': async(ctx, next) => {
        ctx.render("login.html",{
            title: "欢迎登录"
        })
    },
    'GET /register': async(ctx, next) => {
        ctx.render("register.html",{
            title: "用户注册"
        })
    }
};
