<template>

       <div class="editStudent-container"  @click="cancel">
            <div class="editStudent">
                <h3>编辑信息</h3>
            <form ref="editForm">
                <div>
                    <label  for="student-edit-name">姓名</label>
                    <input type="text" id="student-edit-name" name="name" v-model="editVal.name">
                </div>
                <div>
                    <label >性别</label>
                    <input type="radio" checked name="sex"  value="男">男
                    <input type="radio" name="sex" value="女">女
                </div>
                <div>
                    <label  for="student-edit-email">邮箱</label>
                    <input type="text" id="student-edit-email" name="email" v-model="editVal.email">
                </div>
                <div>
                    <label  for="student-edit-sNo">学号</label>
                    <input type="text" id="student-edit-sNo" name="sNo" v-model="editVal.sNo">
                </div>
                <div>
                    <label  for="student-edit-birth">出生年</label>
                    <input type="text" id="student-edit-birth" name="birth" v-model="editVal.birth">
                </div>
                <div>
                    <label  for="student-edit-phone" >手机号</label>
                    <input type="text" id="student-edit-phone" name="phone"  v-model="editVal.phone">
                </div>
                <div>
                    <label for="student-edit-address">住址</label>
                    <input type="text" id="student-edit-address" name="address" v-model="editVal.address">
                </div>
                <div>
                    <label></label>
                    <button class="btn" @click.prevent="submit">提交</button>
                </div>
            </form>
            </div>
        </div>

</template>

<script>
import {updataStudent} from "@/api";
import getFormData from "@/util/getFormData"
export default {
    data(){
        return{
            editVal:null,
        }
    },
    methods:{
         async submit(){   
            const newData = getFormData(this.$refs.editForm).data
            const result = await updataStudent( newData )
            alert(result.data.msg)
            this.$router.push({name:"studentList"})
            window.location.reload()
        },
        cancel(e){
            if(e.target.className == "editStudent-container"){
                 this.$router.push({name:"studentList"})
            }
        },
    },
    created(){
        this.editVal = {
            ...this.$route.params.item
        }
    }
}
</script>
<style lang="less" scoped>
.editStudent-container{
            position: fixed;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
            width: 100vw;
            height: 100vh;
            .editStudent{
                width: 400px;
                height: 400px;
                background-color: white;
                position: absolute;
                left: 50%;
                top: 50%;
                transform:translate(-50%,-50%);
                padding:20px;
                label{
                    display: inline-block;
                    text-align: right;
                    margin-right: 10px;
                    width: 120px;
                }
                div{
                    height: 40px;
                }
            }
        }
</style>