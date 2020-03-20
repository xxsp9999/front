let count = 2;

/**
 * 页面跳转倒计时
 */
function toPage() {
    $("#countDown").text(count);
    count --;;
    if (count === 0) {
        clearInterval();
        location.href = "/";
    }
}
setInterval("toPage()", 1000);