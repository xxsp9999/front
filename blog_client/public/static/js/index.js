/**
 * @description 获取最新资讯
 * @param condition 查询条件
 */
function getLastedNews(condition) {
    $.ajax({
        url: 'http://localhost:8686/news/postMsg',
        type: "post",
        dataType: "json",
        data: {
            "condition": condition,
        },
        success: function (res) {
            console.debug("跨域获取新闻数据：" + res)
            if (res.success) {
                let datas = res.data;
                let str = "";
                $("#lastedNews").empty();
                for (let i in datas) {
                    str += "<li>" + datas[i] + "</li>";
                }
                $("#lastedNews").append(str);
            }
        },
        error: function (e) {
            $("#lastedNews").append("系统升级中，服务暂时无法连接");
        }
    })
}

getLastedNews("");//调用函数

function getLastedPlans(condition) {
    $.ajax({
        url: '/getLastedPlans',
        type: "post",
        dataType: "json",
        data: {
            "condition": condition,
        },
        success: function (res) {
            if (res.success) {
                let datas = res.datas;
                let str = "";
                $("#lastedPlans").empty();
                for (let i in datas) {
                    str += "<li>" + datas[i] + "</li>";
                }
                $("#lastedPlans").append(str);
            }
        },
        error: function (e) {
            console.error(e);
        }
    })
}

getLastedPlans("");//函数调用


