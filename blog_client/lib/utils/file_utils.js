/*文件工具类*/
const fs = require("fs");

/**
 * @description 文件复制
 * @param sourcePath 源文件路径
 * @param destPath 目标文件路径
 */
function fileCopy(sourcePath,destPath) {
    try{
        let readStream = fs.createReadStream(sourcePath);//读取文件流
        let writeStream = fs.createWriteStream(destPath);//创建写入流
        readStream.pipe(writeStream);//将读取流输出到写入流
        //console.log("文件写入成功！");
    }catch (e) {
        console.log("文件路径不存在！");
    }
}