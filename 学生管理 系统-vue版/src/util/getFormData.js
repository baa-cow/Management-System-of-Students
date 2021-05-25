export default function(form) {

    const name = form.name.value
    const email = form.email.value
    const sNo = form.sNo.value
    const birth = form.birth.value
    const phone = form.phone.value
    const address = form.address.value
    let sex = form.sex.value
        //为空弹窗提示
    if (!name || !sex || !sNo || !email || !birth || !phone || !address) {
        return {
            status: "fail",
            msg: "请填写完整的信息",
        }
    }
    //邮箱格式  @ .com/.cn
    const emailReg = /^[\w]+@[\w-]+\.(com|cn)$/
    if (!emailReg.test(email)) {
        return {
            status: "fail",
            msg: "邮箱格式不正确",
        };
    }
    // 出生年份  年龄在 10 - 80之间  1940 - 2010
    if (birth < 1940 || birth > 2010) {
        return {
            status: "fail",
            msg: "学生出生年份请填写1940 - 2010 之间的数字",
        }
    }
    // 手机号  11位数字  以1开头  第二位不是1/2
    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(phone)) {
        return {
            status: "fail",
            msg: "手机号格式不正确",
        }
    }
    // 学号必须为4-16位的数字组成
    const sNoReg = /^\d{4,16}$/
    if (!sNoReg.test(sNo)) {
        return {
            status: "fail",
            msg: "学号必须为4-16位的数字组成",
        }
    }
    sex = form.sex.value == "男" ? 0 : 1
    return {
        data: {
            name,
            sex,
            email,
            sNo,
            birth,
            phone,
            address,
        }
    }
}