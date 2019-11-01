package pers.xx.blog.utils;

/**
 * @ClassName MsgUtils
 * @Author XieXing
 * @Description 信息工具类
 * @Date 2019/10/31 14:17
 * @Version 1.0
 */
public class MsgUtils {
    private boolean success;//成功状态
    private String msg;//描述信息
    private Object data;//数据

    public MsgUtils() {
    }

    public MsgUtils(boolean success, String msg, Object data) {
        this.success = success;
        this.msg = msg;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
