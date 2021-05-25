import Vue from 'vue';
import VueRouter from 'vue-router';
import studentContent from "@/components/studentContent"
import editStudent from "@/components/editStudent"
import addStudent from "@/components/addStudent"
Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/studentList"
}, {
    path: "/studentList",
    name: "studentList",
    component: studentContent,
    children: [{
        path: "edit",
        name: "edit",
        component: editStudent
    }]
}, {
    path: "/addStudent",
    //     component: () =>
    //         // import ("@/components/addStudent") 懒加载会报错
    // }
    component: addStudent
}]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router