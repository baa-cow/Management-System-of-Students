// /api/student / findByPage
import axios from 'axios';

// function axiosFn (url,method,option){
//     axios.method(url,{
//         params:{
//             appkey: "aniu_1607172334104",
//             ...option
//         }
//     })
// }
export const findByPage = function(page = 1, size = 10) {
    return axios.get("http://open.duyiedu.com/api/student/findByPage", {
        params: {
            appkey: "aniu_1607172334104",
            page,
            size
        },
    })
};
// /api/student/findAll查找所有学生
export const findAll = axios.get("http://open.duyiedu.com/api/student/findAll", {
    params: {
        appkey: "aniu_1607172334104",
    },
});
export const updataStudent = function(option) {
        return axios.get("http://open.duyiedu.com/api/student/updateStudent", {
            params: {
                appkey: "aniu_1607172334104",
                ...option
            }
        });
    }
    // /api/student/delBySno删除学生
export const delBySno = function(sNo) {
        return axios.get("http://open.duyiedu.com/api/student/delBySno", {
            params: {
                appkey: "aniu_1607172334104",
                sNo
            }
        })
    }
    // /api/student/addStudent添加学生
export const addStudent = function(option) {
    return axios.get("http://open.duyiedu.com/api/student/addStudent", {
        params: {
            appkey: "aniu_1607172334104",
            ...option
        }
    })
}