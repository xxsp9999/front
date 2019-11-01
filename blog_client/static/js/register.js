//注册操作
//点击注册
$("#regBtn").click(function () {
    let userName = $("input[name='email']").val();
    let userPassword = $("input[name='password']").val();
    //用户名非空判断
    if (!userName) {
        $("#emailTips").val("邮箱不能为空！");
        return false;
    }
    //密码非空判断
    if (!userPassword) {
        $("#passwordTips").val("密码不能为空你！");
        return false;
    }
    //将数据保存到数据库
    let res = ajaxMethod("/signup", "post", {userName: userName, userPassword: userPassword});
    if (res.success) {
        ctx.render('signin-ok.html', {
            title: 'Sign up OK',
            name: 'Mr Node'
        });
        // location.href="signin-ok.html";
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign up OK',
            name: 'Mr Node'
        });
        // location.href="signin-failed.html";
    }
});
