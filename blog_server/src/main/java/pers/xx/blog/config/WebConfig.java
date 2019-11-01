package pers.xx.blog.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pers.xx.blog.filter.CorsFilter;


/**
 * @Author XieXing
 * @Description 过滤器配置
 * @Date 16:05 2019/11/1
 **/
@Configuration
public class WebConfig {
    private static final String allowMethods = "GET,POST,PUT,DELETE,OPTIONS";
    private static final String allowOrigin = "http://localhost:8080,http://localhost:8088";
    private static final String allowCredentials = "true";
    private static final String allowHeaders = "Content-Type,X-Token";

    @Bean
    public FilterRegistrationBean loginFilterRegistrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setName("CorsFilter");
        filterRegistrationBean.setFilter(new CorsFilter());
        filterRegistrationBean.addInitParameter("allowMethods", allowMethods);
        filterRegistrationBean.addInitParameter("allowOrigin", allowOrigin);
        filterRegistrationBean.addInitParameter("allowCredentials", allowCredentials);
        filterRegistrationBean.addInitParameter("allowHeaders", allowHeaders);
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }
}