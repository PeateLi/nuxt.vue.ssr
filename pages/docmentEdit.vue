<template>
    <div  class="document_edit">
        <div class="from">
            <div class="from_input">
                <span class="span_text">标题：</span>
                <el-input
                placeholder="请输入内容"
                v-model="titleInput"
                clearable>
                </el-input>
                <span class="span_text">目录：</span>
                <el-select v-model="fileValue" clearable placeholder="请选择">
                    <el-option
                    v-for="item in meunData.data"
                    :key="item.categoryID"
                    :label="item.categoryName"
                    :value="item.categoryID">
                    </el-option>
                </el-select>
            </div>
            
            <div class="from_btn">
                    <el-dropdown trigger="click" split-button type="primary" @click="handleClick">
                    更多菜单
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="submit()">保存</el-dropdown-item>
                        <el-dropdown-item>新建模板</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                    <nuxt-link :to="{name:'index'}">
                    <el-button >返回</el-button>
                    </nuxt-link>
            </div>

        </div>
        <editot :data='editData' @getNewDocData='getNewDocData'></editot>
    </div>
</template>


<script>
import {DropDownMenu,addDoc,editDoc} from '../api/meun'
export default {
    data(){
        return {
        titleInput:'',
        fileValue: '',
        editData:{},
        docContent:''
        }
    },
    components:{
        editot:() => import('../components/documentEdit/editor')
    },
    async asyncData(content){
      var data = ''
      const [meunData] = await Promise.all([
        DropDownMenu(data)
      ])
      return {
        meunData
      }
    },
    methods:{
        handleClick() {
        
        },
        submit(){
          let _this = this
          if(this.$route.params.editData){
            let params = {
                ID: this.$route.params.editData.id,
                DocName: _this.titleInput,
                DocContent: _this.docContent,
                CategoryID: _this.fileValue,
                CreateTime: "",
                UpdateTime: ""
            }
            editDoc(params)
            .then(res => {
             if(res.code == 1000){
                this.$message({
                            type:'success',
                            message:'编辑成功！'
                 })
              }else{
                this.$message({
                        message: '编辑失败',
                        type: 'warning'
                        });
              }
            })
            .catch(error => {
              this.$message.error('请求出错'+error);
            })
          }else{
            if(_this.fileValue == ''){
              _this.fileValue = 0
            }
            let params = {
                ID: 0,
                DocName: _this.titleInput,
                DocContent: _this.docContent,
                CategoryID: _this.fileValue,
                CreateTime: "",
                UpdateTime: ""
            }
            addDoc(params)
            .then(res => {
              if(res.code == 1000){
                this.$message({
                            type:'success',
                            message:'新增成功！'
                 })
              }else{
                this.$message({
                        message: '新增失败',
                        type: 'warning'
                        });
              }
            })
            .catch(error => {
               this.$message.error('请求出错'+error);
            })
          }
        },
        getNewDocData(val){
         this.docContent = val
        }
    },
    mounted(){
      let _this = this
      if(this.$route.params.editData){
       _this.fileValue =  _this.$route.params.editData.categoryID
        _this.titleInput = this.$route.params.editData.docName
        _this.editData = this.$route.params.editData
      }
      _this.meunData.data.unshift({
                    categoryName:'无',
                    categoryID:0,
                    categoryLevel:0
                })
    }
}
</script>


<style lang="scss" scoped>
.document_edit{
    width: 90%;
    margin: 0px auto;
}
.from{
    width: 100%;
    height: 50px;
    margin-top: 15px;
    margin-bottom: 30px;
}
/deep/ .el-input{
    width: auto;
}
 .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .from_input{
      float: left;
  }
  .from_btn{
      float: right;
  }
</style>