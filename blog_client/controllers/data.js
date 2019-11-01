module.exports = {
    'POST /getLastedNews': async (ctx, next) => {
        let data = [];
        data.push("HTML5开发APP有哪些优点和缺点？HTML5优势和劣势大对比");
        data.push("SEO做网站优化需要每天都更新文章吗？");
        data.push("UI设计师现在月薪多少？");
        var res = {};
        res.datas = data;
        res.success = true;
        ctx.response.body = res;
    },
    'POST /getLastedPlans': async (ctx, next) => {
        let data = [];
        data.push("个人博客开发。");
        data.push("备考2019下半年软考中级网络工程师。");
        data.push("准备2021考研。");
        var res = {};
        res.datas = data;
        res.success = true;
        ctx.response.body = res;
    },

    'GET /getLastedPlansForget': async (ctx, next) => {
        console.debug("------------");
        let data = [];
        data.push("个人博客开发。");
        data.push("备考2019下半年软考中级网络工程师。");
        data.push("准备2021考研。");
        var res = {};
        res.datas = data;
        res.success = true;
        ctx.response.body = res;
    }
};