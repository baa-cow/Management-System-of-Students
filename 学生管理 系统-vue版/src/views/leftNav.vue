<template>
    <div class="leftNav-container">
        <h4>学生管理系统</h4>
        <ul class="student-list">
            <li v-for= "(item,i) in list " :key="i" :class="{active:handler(item)}" @click = "handler(item)" > 
                <router-link :to="item.path">{{item.text}}</router-link>    
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[{
                path:"/studentList",
                text:"学生列表"
            },{
                path:"/addStudent",
                text:"新增学生"
            }],
        }
    },
    methods:{
        handler(item){
            const path = item.path;
            const currentPath = this.$route.path;
            if( path == currentPath || currentPath.startsWith(path) ){
                return true
            }
            return false
        }
    },
    computed:{
        
    }
}
</script>
<style lang="less" scoped>
    .leftNav-container{
        line-height: 40px;
        color:  #b3bcc5;
        font-size: 14px;
        h4{
            padding-left: 10px;
        }
        li{
            cursor:pointer;     
            a{
                color:  #b3bcc5;
                text-decoration: none;
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: left;
                text-indent: 40px;
                &:hover{
                color:black;
            }
            }
        }
        .active{
            background-color: white;
            a{
                color: black;
            }
        }
    }
</style>