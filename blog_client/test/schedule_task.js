/*定时任务*/
const cronJob = require("cron").CronJob;//引入依赖
let count = 1;
let job1 = new cronJob("* * * * * *", function () {
    console.log(count++);
    if (count > 10) {
        this.stop();
    }
}, null, true);
// job1.start();//job启动
// job1.stop();//停止job


