<template>
    <div class="layout-container">
       <!-- <div class="left">
            <slot name="left"></slot>
       </div> -->
        <slot name="left"></slot>
        <slot name="center"></slot>
    </div>
</template>

<style lang="less" scoped>
    .layout-container{
        width: 100%;
        display: flex;
        height: calc( 100% - 70px  );
        .left,.right{
            flex: 0 0 auto;
        }
        .center{
            flex: 1 1 auto;
        }
    }
</style>