<template>
    <div class="add-student-container">
        <div class="addStudent">
            <form ref="addForm" class="addForm">
                <div>
                    <label  for="student-add-name">姓名</label>
                    <input type="text" id="student-add-name" name="name" >
                </div>
                <div>
                    <label >性别</label>
                    <input type="radio" checked name="sex"  value="男">男
                    <input type="radio" name="sex" value="女">女
                </div>
                <div>
                    <label  for="student-add-email">邮箱</label>
                    <input type="text" id="student-add-email" name="email" >
                </div>
                <div>
                    <label  for="student-add-sNo">学号</label>
                    <input type="text" id="student-add-sNo" name="sNo" >
                </div>
                <div>
                    <label  for="student-add-birth">出生年</label>
                    <input type="text" id="student-add-birth" name="birth">
                </div>
                <div>
                    <label  for="student-add-phone" >手机号</label>
                    <input type="text" id="student-add-phone" name="phone" >
                </div>
                <div>
                    <label for="student-add-address">住址</label>
                    <input type="text" id="student-add-address" name="address">
                </div>
                <div>
                    <label></label>
                    <button class="btn" @click.prevent="submit">提交</button>
                     <button class="btn" type="reset" >重置</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import getFormData from "@/util/getFormData"
import {addStudent} from "@/api"
export default {
    methods:{
        async submit(){
            const formData = getFormData(this.$refs.addForm)
            const result =await addStudent( formData.data )
            alert(result.data.msg)
            this.$router.push({name:"studentList"})
        }
    },
   async created(){
    }
}
</script>


<style lang="less" scoped>
    .addStudent{
        .addForm{
            width: 400px;
            margin: 20px auto;
            div{
                margin: 10px 0;
            }
            label{
                    display: inline-block;
                    text-align: right;
                    margin-right: 10px;
                    width: 120px;
                }
        }
    }
</style>