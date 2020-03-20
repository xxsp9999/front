package pers.xx.blog.controller;

import org.springframework.web.bind.annotation.*;
import pers.xx.blog.utils.MsgUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName NewsController
 * @Author XieXing
 * @Description 新闻消息控制器
 * @Date 2019/10/31 14:20
 * @Version 1.0
 */
@RestController
@RequestMapping("/news")
public class NewsController {

    /**
     * @return pers.xx.blog.utils.MsgUtils
     * @Author XieXing
     * @Description 获取新闻数据
     * @Date 17:07 2019/10/31
     * @Param []
     **/
    @ResponseBody
    @GetMapping("/get")
    public MsgUtils getNews() {
        System.out.println("获取新闻消息--------------");
        MsgUtils msgUtils = new MsgUtils();
        msgUtils.setSuccess(true);
        msgUtils.setMsg("获取信息成功！");
        List<String> list = new ArrayList<>();
        list.add("HTML5开发APP有哪些优点和缺点？HTML5优势和劣势大对比");
        list.add("SEO做网站优化需要每天都更新文章吗？");
        list.add("UI设计师现在月薪多少？");
        msgUtils.setData(list);
        return msgUtils;
    }

    /**
     * @return pers.xx.blog.utils.MsgUtils
     * @Author XieXing
     * @Description 根据新闻id获取新闻数据
     * @Date 17:10 2019/10/31
     * @Param []
     **/
    @ResponseBody
    @GetMapping("/get/{id}")
    public MsgUtils getNewsById() {
        MsgUtils msgUtils = new MsgUtils();
        msgUtils.setSuccess(true);
        msgUtils.setMsg("获取信息成功！");
        List<String> list = new ArrayList<>();
        list.add("HTML5开发1APP有哪些优点和缺点？HTML5优势和劣势大对比");
        msgUtils.setData(list);
        return msgUtils;
    }

    /**
     * @return pers.xx.blog.utils.MsgUtils
     * @Author XieXing
     * @Description post方法获取消息
     * @Date 16:35 2019/11/1
     * @Param []
     **/
    @ResponseBody
    @PostMapping("/postMsg")
    public MsgUtils getNewsByCondition(HttpServletRequest request, HttpServletResponse response) {
        MsgUtils msgUtils = new MsgUtils();
        msgUtils.setSuccess(true);
        msgUtils.setMsg("post获取信息成功！");
        List<String> list = new ArrayList<>();
        list.add("HTML5开发APP有哪些优点和缺点？HTML5优势和劣势大对比");
        msgUtils.setData(list);
        return msgUtils;
    }
}
