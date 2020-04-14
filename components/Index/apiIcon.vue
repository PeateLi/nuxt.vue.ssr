<template>
    <nav>
        <ul style="margin-top:0px;padding:0px;">
            <!-- <li v-for="(item,index) in iconList" :key="index">
                <a :href="item.src" @click="changeDocu(item)">
                    <el-tooltip :content="item.text" placement="top">
                    <i :class="item.iconName"></i>
                    </el-tooltip>
                </a>
            </li> -->
            <li>
                <nuxt-link :to="{name:'login'}">
                    <el-tooltip content="返回" placement="top">
                    <i class="el-icon-back"></i>
                    </el-tooltip>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name:'docmentEdit'}">
                    <el-tooltip content="新增页面" placement="top">
                    <i class="el-icon-zoom-in"></i>
                    </el-tooltip>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name:'docmentEdit',params:{editData:docData}}">
                    <el-tooltip content="编辑" placement="top">
                    <i class="el-icon-edit"></i>
                    </el-tooltip>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name:'fileManage'}">
                    <el-tooltip content="管理目录" placement="top">
                    <i class="el-icon-folder-add"></i>
                    </el-tooltip>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name:'index'}">
                    <el-tooltip content="删除页面" placement="top">
                    <i class="el-icon-delete" @click="deleteDocument()"></i>
                    </el-tooltip>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name:'index'}">
                    <el-tooltip content="下载" placement="top">
                    <i class="el-icon-bottom" v-on:click="getPdf(docData.docName)"></i>
                    
                    </el-tooltip>
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>


<script>
import {deleteDoc} from '../../api/meun'
 import Bus from '../bus'
export default {
    data(){
        return {
            iconList:[
                {iconName:'el-icon-back',text:'返回',src:'#'},
                {iconName:'el-icon-zoom-in',text:'新增页面',src:'#'},
                {iconName:'el-icon-edit',text:'编辑',src:'#'},
                {iconName:'el-icon-folder-add',text:'管理目录',src:'/fileManage'},
                {iconName:'el-icon-delete',text:'删除页面',src:'#'},
                {iconName:'el-icon-bottom',text:'下载',src:'#'}
            ],
            id:'',
            docData:'',
            htmlTitle: ''
        }
    },
    methods:{
        deleteDocument(){
            let _this = this
            if(!_this.id){
                this.$message({
                    message:'还未选择删除项',
                    type: 'error'
                });
                return
            }
        this.$confirm('确定删除嘛?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteDoc(_this.id)
            .then(res => {
              if(res.code == 1000){
                  this.$message({
                type: 'success',
                message: '删除成功!'
                });
              }else{
                   this.$message({
                    message:res.msg,
                    type: 'warning'
                   });
              }
            })
            .catch(error => {
               this.$message({
                    message:'请求出错'+error,
                    type: 'error'
                   });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted(){
        let _this = this
       Bus.$on('getDocument', (content) => { 
          _this.id = content.id
          _this.docData = content
       })
    }
}
</script>


<style lang="scss" scoped>
ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
ul li {
    list-style: none;
    width: 33%;
    margin-bottom: 15px !important;
    i{
        cursor: pointer;
    }
}
@media (max-width: 600px) {
    ul li{
        text-align: center;
    }
}
</style>