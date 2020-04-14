<template>
  <div class="layouts">
    <Header v-if='$route.name == "index"'></Header>
    <nuxt />
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  components:{
    Header:() => import('./Header')
  }
}
</script>

<style>
/*修改滚动条样式*/
html::-webkit-scrollbar{
  width:10px;
  height:10px;
  /**/
}
html::-webkit-scrollbar-track{
   /* background: rgb(239, 239, 239); */
  border-radius:2px;
}
html::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
html::-webkit-scrollbar-thumb:hover{
  background: #bfbfbf;
}
html::-webkit-scrollbar-corner{
  background: #179a16;
}
.layouts{
  height: 100%;
}
</style>
