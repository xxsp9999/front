/**
 * @description ajax通用方法
 * @param url 路径
 * @param method 方法名
 * @param data 数据（类型：对象）
 * @returns {Promise<*>}
 */
async function ajaxMethod(url, type, data) {
    let res;
    await $.ajax({
        url: url,
        type: type,
        dataType: "json",
        data: data,
        success: function (result) {
            res = result;
        },
        error(err) {
            res = err;
        }
    });
    return res;
}

/**
 * @description banner图轮播
 */
function bannerLoop() {
    let bannerCount = 0;
    let banners = ["banner_1.png", "banner_2.jpg", "banner_3.jpeg"];
    // setInterval(function () {
    //     $("#important").css("background", "url(/static/image/banner/" + banners[bannerCount] + ")");
    //     $("#important").css("background-size", "100% 100%");
    //     bannerCount++;
    //     if (bannerCount === 3) {
    //         bannerCount = 0;
    //     }
    // }, 3000);
}
bannerLoop();

/**
 * @description 获取用户ip
 * @param condition
 */
function getUseIp(condition) {
    $.ajax({
        url: '/ipInfo',
        type: "get",
        dataType: "json",
        data: {
            "condition": condition,
        },
        success: function (res) {
            $("#loginUserName").append(res);
        },
        error: function (e) {
            console.error(e);
        }
    })
}
// getUseIp();