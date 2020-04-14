<template>
    <div class="menu-tree">
    <label v-for="(list,index) in list" >
      <div  v-for="(file,i) in list">
          <el-submenu :index="file.categoryID.toString()" v-if="file.categoryID">
            <template slot="title">
              <i class="el-icon-folder-opened" v-if="file.categoryLevel"></i>
              <span>{{file.categoryName}}</span>
            </template>
            <label>
              <child-menu :list="file.meauLists" @getDoument='getDoument'></child-menu>
            </label>
          </el-submenu>
            <el-menu-item  v-else :index="file.id+'-'+i">
            <span slot="title" @click='getDoumentData(file)'><i class="el-icon-document" ></i>{{file.docName}}</span>
          </el-menu-item>
      </div>
    </label>
  </div>
</template>
 
<script>
import Bus from '../bus'
import {getDoument} from '../../api/meun'
export default {
  name:'childMenu',
  props:{
    list:{
      type: Object,
      default:function(){
        return {}
      }
    },
  },
  data(){
    return {
    }
  },
  methods:{
    getDoumentData(data){
     getDoument(data.id)
     .then(res => {
         this.$emit('getDoument',res.data)
     })
     .catch(error => {
       console.log(error)
     })
    },
    getDoument(data){
      Bus.$emit('getDocument', data)
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss" scoped>
.tree-box{
  margin:20px auto;
}
.item{
  padding:10px;
}
/deep/ .el-submenu .el-menu-item{
  min-width: 152px;
}
</style>
