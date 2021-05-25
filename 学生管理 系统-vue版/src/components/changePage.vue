<template>
    <div class="changePage-container">

        <a  :class="{first:true,disabled:current == 1}" @click="handleClick(1,$event)">&lt;&lt;第一页</a>
        <a  :class="{last:true,disabled:current == 1}" @click="handleClick(current - 1,$event)">&lt;&lt;上一页</a>
        <a v-for="item in nums" :key="item" :class="{active:current==item}" @click="handleClick(item,$event)">{{item}}</a>
        <a :class="{next:true,disabled:current == pageNumber}"  @click="handleClick(current + 1,$event)">下一页&gt;&gt;</a>
        <a  :class="{end:true,disabled:current == pageNumber}" @click="handleClick( pageNumber,$event )">最后一页&gt;&gt;</a>
    </div>
</template>

<script>
export default {
    props:{
        limit:{
            type:Number,
            default:10
        },
        pageLimit:{
            type:Number,
            default:10
        },
        current:{
            type:Number,
            default:1
        },
        pageNumber:{
            type:Number,
        }
    },
    data(){
        return{

        }
    },
    methods:{
        handleClick(n,e){
            if(e.target.classList.contains("disabled")){
                return
            }

            this.$emit("change",n)
        }
    },
    created(){


    },
    computed:{
        
        min(){
            return this.current - Math.floor(this.pageLimit/2) <= 0 ? 1 : this.current - Math.floor(this.pageLimit/2)
        },
        max(){
            return this.current + Math.floor(this.pageLimit/2) >= this.pageNumber ? this.pageNumber : this.min + this.pageLimit -1
        },
        nums(){
            const arr = [];
            for (let i =this.min ; i <= this.max ; i++){
                arr.push(i)
            }
            // console.log(this.current + Math.floor(this.pageLimit/2) > this.pageNumber,this.max );
            return arr
        }
    }
}
</script>
<style lang="less" scoped>
    .changePage-container{
            display: flex;
            a{
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                margin-right: 10px;
                border: 1px solid black;
                cursor: pointer;
                &.active{
                    color: red;
                }
                &.disabled{
                    color: #999;
                    cursor: not-allowed;
                }
            }
            .first,.last,.next,.end{
                width: auto;
                padding:0 10px;
            }

    }
</style>