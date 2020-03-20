/*标记js 2019-11-10*/
/**
 * @description 加载图片
 * @param myCanvas 标记的canvas
 * @param data 标记数据
 */
function myCanvasDraw(myCanvas, data) {
    let tmpCanvas = myCanvas;
    let img = new Image();// 创建对象
    img.src = "/downLoad?filePath="+'/xx_blog_data/mark/source/mark.png';
    img.checkJosn = data;
    img.onload = function () {// 加载完成执行
        drawBegin(tmpCanvas, img);
    };
}

/**
 * @description 开始标记
 * @param canvas
 * @param img
 */
function drawBegin(canvas, img) {
    var canvasImg = img;
    var currCanvas = canvas;
    currCanvas.width = canvasImg.width;
    currCanvas.height = canvasImg.height;
    var canvasContext = currCanvas.getContext("2d");
    canvasContext.drawImage(img, 0, 0);

    //初始化
    canvasContext.strokeStyle = "red";
    canvasContext.fillStyle = "#0000ff";
    canvasContext.lineWidth = 1;
    let data = img.checkJosn;
    let checkData = JSON.parse(data);


    Object.keys(checkData).forEach(function (item) {
        checkData[item].forEach(function (data_temp) {
            let coordinate = data_temp;//坐标
            let rect = dealData(coordinate);
            canvasContext.strokeRect(rect.x1, rect.y1, rect.width, rect.height);
        })
    });
}

/**
 * @description 标记数据处理
 * @param checkData 标记
 */
function dealData(checkData) {
    let rect = {};
    rect.x1 = checkData[1];
    rect.y1 = checkData[2];
    rect.x2 = checkData[3];
    rect.y2 = checkData[4];
    if (rect.x1 > rect.x2) {
        let x = rect.x1;
        rect.x1 = rect.x2;
        rect.x2 = x;
    }
    if (rect.y1 > rect.y2) {
        let y = rect.y1;
        rect.y1 = rect.y2;
        rect.y2 = rect.y;
    }
    rect.width = rect.x2 - rect.x1;
    rect.height = rect.y2 - rect.y1;
    return rect;
}
let data = '{"馈线接头":[[0.6900911331176758,100,224,453,333]]}';//测试数据
let canvas1 = document.getElementById("canvasOne");
myCanvasDraw(canvas1,data);
let canvas2 = document.getElementById("canvasTwo");
myCanvasDraw(canvas2,data);