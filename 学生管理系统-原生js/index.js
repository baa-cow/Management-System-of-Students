//学生数据 
var studentData = [];

function ajax(method, url, data, cb, isAsync) {
    // get   url + '?' + data
    // post
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // xhr.readyState    1 - 4  监听是否有响应
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(JSON.parse(xhr.responseText));
            }
        }
    };
    method = method.toUpperCase();
    if (method == "GET") {
        xhr.open(method, url + "?" + data, isAsync);
        xhr.send();
    } else if (method == "POST") {
        xhr.open(method, url, isAsync);
        // key=value&key1=valu1
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
}

function init() {
    initDom();
    bindEvent();
}
init();

function bindEvent() {
    var odl = document.querySelector('.menu');
    //点击菜单
    odl.onclick = function(e) {
        var id = e.target.dataset.id;
        //清除兄弟节点的active类名，为当前点击添加active
        var actives = getSiblings(e.target);
        for (var i = 0; i < actives.length; i++) {
            actives[i].classList.remove('active')
        }
        e.target.classList.add('active');

        //获取对应的内容区
        var content = document.getElementById(id);
        content.classList.add('content-active');
        for (var i = 0; i < getSiblings(content).length; i++) {
            getSiblings(content)[i].classList.remove('content-active')
        }
    };
    //点击提交按钮
    var osubmit = document.getElementsByClassName('submit')[0];
    osubmit.onclick = function(e) {
            e.preventDefault();
            var formData = getFormData();
            if (formData.status == 'fail') {
                alert(formData.msg);
            } else {
                transferData(formData.data, "/api/student/addStudent", function() {
                    alert('提交成功');
                    initDom();
                    var studentList = document.querySelector('#student-list');
                    studentList.click();
                })
            }
        }
        // 编辑按钮点击行为
        // 表格体
    var tbody = document.querySelector('#student-body tbody');
    // 编辑弹窗元素
    var modal = document.querySelector('.modal');
    tbody.onclick = function(e) {
            // 编辑按钮
            if (e.target.classList.contains('edit')) {
                // 点击编辑按钮需要将编辑表单显示出来
                modal.classList.add('show');
                // 当前编辑按钮对应的学生索引
                var index = e.target.dataset.index;
                // 渲染编辑表单数据
                renderEditForm(studentData[index]);
            } // 删除按钮
            else if (e.target.classList.contains('remove')) {
                var index = e.target.dataset.index;
                var student = studentData[index];
                // 确认删除的弹窗  如果点击确认返回true  点击取消返回 false
                var isDel = confirm('确认删除学号为' + student.sNo + '的学生信息吗？');
                if (isDel) {
                    transferData({
                        sNo: student.sNo
                    }, '/api/student/delBySno', function() {
                        alert('删除成功');
                        initDom();
                    })
                }
            }
            // 编辑表单的提交
            var studentEditSubmit = document.getElementById('student-edit-submit');
            studentEditSubmit.onclick = function(e) {
                e.preventDefault();
                // 获取新增学生的表单数据
                var form = document.getElementById("student-edit-form");
                var formData = getFormData(form);
                // 如果数据校验未通过则弹出错误信息
                if (formData.status == "fail") {
                    alert(formData.msg);
                } else {
                    transferData(formData.data, '/api/student/updateStudent', function() {
                        alert('修改成功');
                        modal.classList.remove('show');
                        initDom();
                    });
                }
            }
        }
        // 点击编辑弹窗的遮罩层  则弹窗消失
    modal.onclick = function(e) {
        if (e.target === this) {
            modal.classList.remove('show');
        }
    }
};

function getSiblings(dom) {
    var siblings = dom.parentNode.children;
    return Array.from(siblings).filter(item => item != dom)
}

function getFormData() {
    var form = document.querySelector('.student-form');
    var name = form.name.value;
    var email = form.email.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    var sex = form.sex.value;
    //为空弹窗提示
    if (!name || !sex || !sNo || !email || !birth || !phone || !address) {
        return {
            status: "fail",
            msg: "请填写完整的信息",
        };
    };
    //邮箱格式  @ .com/.cn
    var emailReg = /^[\w\.]+@[\w-]+\.(com|cn)$/;
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
    var phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
        return {
            status: "fail",
            msg: "手机号格式不正确",
        };
    }
    // 学号必须为4-16位的数字组成
    var sNoReg = /^\d{4,16}$/;
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
    var dataStr = '';
    if (typeof data == 'object') {
        //assign合并对象，接口要求加入appkey
        data = Object.assign({ appkey: 'aniu_1607172334104' },
            data
        );
        for (var prop in data) {
            dataStr += prop + '=' + data[prop] + '&';
        }
    } else if (typeof data == 'string') {
        dataStr = data + '&' + 'appkey=aniu_1607172334104';
    }
    ajax('get', "http://open.duyiedu.com" + url, dataStr, function(res) {
        if (res.status == 'success') {
            //请求成功执行回调函数
            success(res.data);
        } else {
            //请求失败探弹窗
            alert(res.msg)
        }
    })
}

function createDom(data) {
    var strDom = '';
    for (var i = 0; i < data.length; i++) {
        strDom += `<tr>
        <td>${data[i].sNo}</td>
        <td>${data[i].name}</td>
        <td>${data[i].sex = 0 ? "男" : "女"}</td>
        <td>${data[i].email}</td>
        <td>${new Date().getFullYear()-data[i].birth}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].address}</td>
        <td>
            <button class="btn edit" data-index="${i}">编辑</button>
            <button class="btn remove" data-index="${i}">删除</button>
        </td>
        </tr>`;
    }
    var otbody = document.querySelector('tbody');

    otbody.innerHTML = strDom;
}

function initDom() {
    ajax('get', "http://open.duyiedu.com/api/student/findAll", 'appkey=aniu_1607172334104', function(data) {
        studentData = data.data;
        createDom(studentData)
    })
}

// 编辑表单的数据回填
function renderEditForm(data) {
    var form = document.getElementById('student-edit-form');
    for (var prop in data) {
        if (form[prop]) {
            form[prop].value = data[prop];
        }
    }

}