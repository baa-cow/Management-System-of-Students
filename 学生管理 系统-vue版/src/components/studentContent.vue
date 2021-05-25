<template>
    <div class="student-container">
        <table class="student-body"  >
            <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>邮箱</th>
                    <th>年龄</th>
                    <th>手机号</th>
                    <th>住址</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "(item) in list" :key="item.sNo">
                    <td>{{item.sNo}}</td>
                    <td>{{item.name}}</td>
                    <td>{{ item.sex == 0?"男":"女" }}</td>
                    <td>{{item.email}}</td>
                    <td>{{ new Date().getFullYear() - item.birth}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.address}}</td>
                    <td>
                        <button class="btn edit" >
                            <router-link class="btn edit" :to="{name:'edit' ,params:{
                                item,
                                initDom
                            }}" >编辑</router-link>
                        </button>
                         <button class="btn remove" @click="remove(item.sNo)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <changePage :limit="limit" :pageNumber="pageNumber" :pageLimit="pageLimit" :current="current" @change="handlePage"></changePage>
        <router-view></router-view>
    </div>
</template>
<script>
import {findByPage,delBySno,findAll} from "@/api";
import changePage from "@/components/changePage"
export default {
    data(){
        return{
            list:[],
            path:"/studentList",
            current:1,
            limit:20,
            pageLimit:10,
            pageNumber:0,
        }
    },
    methods:{
        async initDom(){
            const res = await findByPage(this.current,this.limit);
            this.list = res.data.data.findByPage;
        },
        async remove(sNo){
            const result =await delBySno(sNo)
            alert(result.data.msg)
            this.initDom()
            window.location.reload()
        },
        handlePage(newVal){
            this.current = newVal;
            this.initDom(this.current)
        }
    },
    components:{
        changePage
    },
    async created(){
        const res = await findAll;
        this.initDom();
        this.pageNumber = Math.ceil(res.data.data.length/ this.limit);
    },
    watch:{
        $route:{  
            handler(){
                if(this.$route.path == this.path){
                    this.initDom()
                }
            } 
        }
    }
}
</script>
<style lang="less" scoped>
    .student-container{
        font-size:14px;
        .student-body{
            width: 100%;
            text-align: center;
            line-height: 30px;
            background-color: white;
            thead{
                background-color: #e3e8ee;
                color: #646987;
            }
            .btn{
                    padding: 5px 10px;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    color: #fff;
            }
            .edit{
                background-color: #5cb85c;
            }
            .remove{
                background-color: #d9534f;
            }
            a{
                color: white;
            }
        }
    }

</style>