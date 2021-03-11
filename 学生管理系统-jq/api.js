Mock.mock("/studentlist", {
    "status": "success",
    "msg": "查询成功",
    "data|10": [{

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
Mock.mock('/updateStudent', {
    "status": "success",
})
Mock.mock('/delData', {
    "status": "success",
})