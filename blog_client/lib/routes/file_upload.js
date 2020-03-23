const fs = require('fs');
const path = require("path");
const config = require("../../config");
const uuid = require("node-uuid");
module.exports = {
  'POST /upload': async (ctx, next) => {
    try {
      const file = ctx.request.files.file; // 获取上传文件
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      let fileDir = config.upload.path;//文件夹路径
      let filePath = path.join(fileDir, file.name);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, {recursive: true});
      }
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      return ctx.body = "上传成功！";
    } catch (e) {
      console.log("上传失败");
      return ctx.body = "上传失败！";
    }

  },

  'POST /uploads': async (ctx, next) => {
    try {
      // 上传多个文件
      const files = ctx.request.files.file; // 获取上传文件
      let fileDir = config.upload.path;//文件路径
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, {recursive: true});
      }
      let filePathArr = [];
      for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(fileDir, uuid.v1() + getFileExtension(file.name));
        filePathArr.push(filePath);
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
      }
      console.log(filePathArr);
      return ctx.body = "上传成功！";

    } catch (e) {
      console.log("上传失败");
      return ctx.body = "上传失败！";
    }

  },
};

/**
 * @根据文件路径（文件名）获取文件后缀
 * @param filePath
 */
function getFileExtension(filePath) {
  if (filePath) {
    return filePath.substring(filePath.lastIndexOf("."));
  } else {
    console.log("获取文件后缀失败");
    return "";
  }
}