(function() {
    const studentData = Mock.mock({
        "data|200": [{
            "id": "@id",
            "name": "@cname()",
            "birth": "@date('yyyy')",
            "sex|1": [0, 1],
            "sNo": "@integer(1000,1000000)",
            "email": "@email",
            "phone": "@integer(12000000000,19999999999)",
            "address": "@city(true)",
            "appkey": "@work(16)",
            "ctime": 1547190636,
            "utime": 1547190636
        }]
    })
    Mock.mock(RegExp("/studentlist?[\w\W]*"), 'get', function(options) {
        // console.log(options.url);
        let str = options.url.slice(options.url.indexOf('?') + 1);
        let arr = str.split('&');
        const obj = {};
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i].split('=')[0]] = arr[i].split('=')[1]
        }

        for (let i = 0; i < studentData.data.length; i++) {
            if (i >= 20 * (obj.page - 1) && i < 20 * obj.page) {
                result.push(studentData.data[i]);
            }
        }
        return {
            "total": studentData.data.length,
            "data": result,
            "status": "success",
            "msg": "查询成功"
        }
    })
    Mock.mock(RegExp("/addstudent?[\w\W]*"), 'get', {
        "status": "success",
        "msg": "添加成功"
    })
    Mock.mock(RegExp("/updateStudent?[\w\W]*"), 'get', function(options) {

        let str = options.url.slice(options.url.indexOf('?') + 1);
        let arr = str.split('&');
        let newData = {};
        arr.forEach(item => {
            newData[item.split('=')[0]] = item.split('=')[1]
        });
        for (let i = 0; i < studentData.data.length; i++) {
            if (studentData.data[i].sNo == newData.sNo) {
                studentData.data[i] = newData;
                break
            }
        }
        return {
            "status": "success",
            "msg": "修改成功"
        }
    })
    Mock.mock(RegExp("/delData?[\w\W]*"), 'get', function(options) {
        const sNo = options.url.slice(options.url.indexOf('?') + 1);
        let arr = sNo.split('=');
        for (let i = 0; i < studentData.data.length; i++) {
            if (studentData.data[i].sNo == arr[1]) {
                studentData.data.splice(i, 1)
                break
            }
        }
        return {
            "status": "success",
            "msg": "删除成功"
        }
    })
})()