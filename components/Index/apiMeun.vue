<template>
    <nav>
        <el-input
        placeholder="输入关键字后按回车以搜索"
        v-model="input"
        clearable
        @change='getSearchData()'>
        </el-input>
         <el-menu
            default-active="0"
            class="el-menu-vertical-demo">
            <child-menu  :list='CategoryData' @getDoument='getDoument'></child-menu>
            </el-menu>
    </nav>
</template>


<script>
import {getMeunList,getCategoryList,searchDocApi} from '~/api/meun'
import Bus from '../bus'
  export default {
      data() {
      return {
        input: '',
        CategoryData:this.meunData.data,
      }
    },
    props:{
        meunData:{
          type:Object,
          default:() => {
            return {}
          }
        }
    },
    components:{
      childMenu: () => import('~/components/Index/childMenu')
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async handleChange(){
        let _this = this
        const result = await getMeunList(_this.input)
        this.$emit('getSearchData',result)
      },
      getDoument(data){
        Bus.$emit('getDocument', data)
      },
      getSearchData(){
        let _this = this
        if(_this.input == ''){
          _this.CategoryData = this.meunData.data
          return
        }
        searchDocApi(_this.input)
        .then(res => {
          if(res.data.document_Apis.length != 0){
              _this.CategoryData = res.data
          }else{
             this.$message({
                type: 'warning',
                message: '未找到搜索文档!'
                });
          }
         
        })
        .catch(error => {
           this.$message({
                    message:'请求出错'+error,
                    type: 'error'
                   });
        })
      }
    },
    mounted(){
      console.log(this.meunData.data)
    }

  }
</script>



<style lang="scss" scoped>
/deep/ .el-menu{
    border-right: 0px;
}
/deep/ .el-menu-item-group__title{
  padding: 0px;
}
</style>