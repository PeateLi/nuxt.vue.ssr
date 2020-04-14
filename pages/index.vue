<template>
  <main class="container" 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-row :gutter="20">
        <el-col :span="6" class="list">
          <section class="grid-content bg-purple">
              <api-meun :meunData='meunData' @getSearchData='getSearchData' @getShowChildData='getShowChildData'></api-meun>
          </section>
        </el-col>
        <el-col :span="14" class="contnet">
          <section class="grid-content bg-purple">
              <api-content @showList='showList' @showIcon='showIcon'></api-content>
          </section>
        </el-col>
        <el-col :span="4" class="icon">
          <section class="grid-content bg-purple">
            <api-icon></api-icon>
          </section>
       </el-col>
      </el-row>


      <el-drawer
      title="接口菜单"
      :visible.sync="drawer"
      direction="ltr"
      size="50%">
        <api-meun :meunData='meunData' @getSearchData='getSearchData' @getShowChildData='getShowChildData'></api-meun>
    </el-drawer>


    <el-drawer
      title="操作"
      :visible.sync="iconDrawer"
      direction="rtl"
      size="50%">
       <api-icon></api-icon>
    </el-drawer>

  </main>
</template>

<script>
import Cookie from 'js-cookie'
import {getMeunList} from '../api/meun'
export default {
  data(){
    return {
      loading:true,
      drawer:false,
      iconDrawer:false,
    }
  },
  components: {
    apiMeun:() => import('~/components/Index/apiMeun'),
    apiContent:() => import('~/components/Index/apiContent'),
    apiIcon:() => import('~/components/Index/apiIcon')
  },
  async asyncData(content){
      var data = ''
      const [meunData] = await Promise.all([
        getMeunList(data)
      ])
      return {
        meunData
      }
    },
    mounted(){
      if(!Cookie.get('token')){
         this.$router.replace('/login')
      }
      this.loading = false
    },
    methods:{
      getSearchData(val){
          this.meunData = val
      },
      getShowChildData(val,index){
        this.meunData[index] = val
      },
      showList(val){
        this.drawer = val
      },
      showIcon(val){
        this.iconDrawer = val
      }
    }
    
}
</script>
<style lang="scss" scoped>
.container{
  width: 50%;
  margin: 0px auto;
}
  .el-row {
      margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
@media (max-width: 600px) {
  /deep/ .list,.icon {
    display: none !important;
    }
    .container{
      width: 95%;
    }
    .contnet{
      width: 100%;
    }
    /deep/ .el-drawer__body{
      margin: 0px 5px;
    }
  }
</style>
