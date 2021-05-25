<template>
  <div id="app">
    <Head />
    <layout>
      <template #left>
        <div class="left">
          <leftNav/>
        </div>
      </template>
      <template #center>
        <div class="center">
          <center/>
        </div>
      </template>
    </layout>
  </div>
</template>

<script>
import Head from "./views/head";
import layout from "./components/layout";
import leftNav from "./views/leftNav";
import center from "./views/center";
export default {
  name:"app",
  components:{
    Head,
    layout,
    leftNav,
    center
  }

}

</script>

<style >
html,body{
  width: 100%;
}
a{
  text-decoration: none;
}
*{
  margin: 0;
  padding: 0;
}

#app{
  width: 100%;
  height: 100vh;
  
}
.left{
    width: 200px;
    height: 100%;
    background-color: #4d5e70;
   
  }
  .center{
    height:100%;
    background-color: #eee;
  }

</style>>


