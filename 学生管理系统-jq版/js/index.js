$(function() {
    //学生数据 
    let studentData = [];
    let total = 1;
    let size = 20;
    let page = 1;

    function init() {
        initDom();
        bindEvent();
    }
    init();

    function bindEvent() {
        //点击菜单
        $('.menu').click(function(e) {
            const id = e.target.dataset.id;
            // 清除兄弟节点的active类名，为当前点击添加active
            $(e.target).addClass('active').siblings().removeClass('active');
            //获取对应的内容区
            $('#' + id).addClass('content-active').siblings().removeClass('content-active');

        })
        $('.submit').click(function(e) {
                e.preventDefault();
                const formData = getFormData($(this).parents('.student-form')[0])
                if (formData.status == 'fail') {
                    alert(formData.msg);
                } else {
                    transferData(formData.data, "/addstudent", function() {
                        alert('提交成功');
                        initDom();
                        $("dd[data-id='student-list']").click();
                    })
                }
            })
            // 编辑按钮点击行为
            // 表格体
        $('#student-body tbody').on('click', 'button', function(e) {
                // 点击编辑按钮需要将编辑表单显示出来
                if ($(this).hasClass('edit')) {
                    $('.modal').slideDown()
                        // 当前编辑按钮对应的学生索引
                    var index = $(this).parents('tr').index();
                    // 渲染编辑表单数据
                    renderEditForm(studentData[index]);
                } else if ($(this).hasClass('remove')) {
                    // 删除按钮
                    const isDel = confirm('确认删除学号为' + studentData[$(this).parents('tr').index()].sNo + '的学生信息吗？');
                    // 确认删除的弹窗  如果点击确认返回true  点击取消返回 false
                    if (isDel) {
                        transferData('sNo=' + studentData[$(this).parents('tr').index()].sNo, '/delData', function() {
                            alert('删除成功');
                            initDom();
                        })
                    }
                }

            })
            // 编辑表单的提交
        $('#student-edit-submit').click(function(e) {
                e.preventDefault();
                // 获取新增学生的表单数据
                const form = $("#student-edit-form")[0];
                const formData = getFormData(form);
                // 如果数据校验未通过则弹出错误信息
                if (formData.status == "fail") {
                    alert(formData.msg);
                } else {
                    transferData(formData.data, '/updateStudent', function(data) {
                        alert('修改成功');
                        $('.modal').slideUp()
                        initDom();
                    });
                }
            })
            // }

        // 点击编辑弹窗的遮罩层  则弹窗消失
        $('.modal').click(function(e) {
            if (e.target === this) {
                $('.modal').slideUp()
            }
        })
    };

    function getFormData(form) {
        const name = form.name.value;
        const email = form.email.value;
        const sNo = form.sNo.value;
        const birth = form.birth.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const sex = form.sex.value;

        //为空弹窗提示
        if (!name || !sex || !sNo || !email || !birth || !phone || !address) {
            return {
                status: "fail",
                msg: "请填写完整的信息",
            };
        };
        //邮箱格式  @ .com/.cn
        const emailReg = /^[\w\.]+@[\w-]+\.(com|cn)$/;
        if (!emailReg.test(email)) {
            return {
                status: "fail",
                msg: "邮箱格式不正确",
            };
        };
        // 出生年份  年龄在 10 - 80之间  1940 - 2010
        if (birth < 1940 || birth > 2010) {
            return {
                status: "fail",
                msg: "学生出生年份请填写1940 - 2010 之间的数字",
            };
        }
        // 手机号  11位数字  以1开头  第二位不是1/2
        const phoneReg = /^1[3-9]\d{9}$/;
        if (!phoneReg.test(phone)) {
            return {
                status: "fail",
                msg: "手机号格式不正确",
            };
        }
        // 学号必须为4-16位的数字组成
        const sNoReg = /^\d{4,16}$/;
        if (!sNoReg.test(sNo)) {
            return {
                status: "fail",
                msg: "学号必须为4-16位的数字组成",
            };
        }
        return {
            status: "success",
            data: {
                name,
                sex,
                email,
                sNo,
                birth,
                phone,
                address,
            },
        };
    };

    function transferData(data, url, success) {
        let dataStr = '';
        if (typeof data == 'object') {
            for (let prop in data) {
                dataStr += prop + '=' + data[prop] + '&';
            }
        } else if (typeof data == 'string') {
            dataStr = data
        }
        //不传数据，如果传数据会拼接数据到url后面导致mock不拦截
        $.ajax({
            url,
            type: 'get',
            data: dataStr,
            dataType: 'json',
            success(res) {
                success(res.data);
            },
            error(err) {
                console.log(err);
            }
        })
    }

    function createDom(data) {
        let strDom = '';
        for (let i = 0; i < data.length; i++) {
            strDom += `<tr>
        <td>${data[i].sNo}</td>
        <td>${data[i].name}</td>
        <td>${data[i].sex = 0 ? "男" : "女"}</td>
        <td>${data[i].email}</td>
        <td>${new Date().getFullYear()-data[i].birth}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].address}</td>
        <td>
            <button class="btn edit">编辑</button>
            <button class="btn remove">删除</button>
        </td>
        </tr>`;
        }
        $('tbody').html(strDom)
        $('#pageWrap').page({
            current: page,
            total,
            change: function(current) {
                page = current;
                initDom();
            }
        })
    }

    function initDom() {
        $.ajax({
            url: '/studentlist',
            type: 'get',
            dataType: 'json',
            data: {
                page,
                size,
            },
            dataType: 'json',
            success(data) {
                studentData = data.data;
                total = Math.ceil(data.total / size);
                createDom(studentData)
            }
        })
    }
    // 编辑表单的数据回填
    function renderEditForm(data) {
        const form = $('#student-edit-form')[0];
        for (let prop in data) {
            if (form[prop]) {
                form[prop].value = data[prop];
            }
        }

    }
})