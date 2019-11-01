package pers.xx.blog.model;

import java.io.Serializable;
import java.util.Date;

/**
 * @ClassName News
 * @Author XieXing
 * @Description 消息信息类
 * @Date 2019/10/31 16:40
 * @Version 1.0
 */
public class News implements Serializable {
    private static final Long serialVersionUID = 1L;//序列化
    private Integer id;//消息id
    private String title;//标题
    private String content;//内容
    private Date addDate;//消息添加时间
    private Date opt;//操作时间 用作消息置顶功能 当需要将消息置顶时，只需要将其操作时间改为现在，并按时间进行倒叙排序
    private String remark;//备注

    public static Long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public Date getOpt() {
        return opt;
    }

    public void setOpt(Date opt) {
        this.opt = opt;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
