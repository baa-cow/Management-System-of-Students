<template>
   <div class="header-container">
        <img src="@/static/logo.png" alt="">
        <span>***教育</span>
   </div>
</template>
<script>
export default {
    name: 'header',
    components: {
   
  }
}
</script>

<style lang="less" scoped>
    .header-container{
        height: 70px;
        font-size: 14px;
        background-color: #354457;
        color: #b3bcc5;
        img{
            width: 30px;
            height: 30px;
            vertical-align: middle;
            margin-left: 20px;
        }
        span{
            line-height: 70px;
        }
    }
</style>
