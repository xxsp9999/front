package pers.xx.blog.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName UserController
 * @Author XieXing
 * @Description 用户信息控制类
 * @Date 2019/10/31 14:05
 * @Version 1.0
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @ResponseBody
    @RequestMapping("/getUser")
    public String demo(){
        return "Hello，you get user success!";
    }
}
