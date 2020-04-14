<template>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span v-if="titile">{{titile}}</span>
    
    <i class="el-icon-menu" @click="showList()"></i>
    <span v-if='titile == ""'>说明</span>
    <i @click="showIcon()" class="el-icon-caret-bottom"></i>
  </div>
    <client-only><mavon-editor
    :toolbars="markdownOption"
    v-model="handbook"
    defaultOpen='preview'
    :subfield='false'
    :toolbarsFlag='false'
    id='pdfDom'/></client-only>


    
</el-card>
</template>

<script>
 import Bus from '../bus'
export default {

  data(){
    return {
      markdownOption:{

      },
      titile:"",
      handbook:`
      EasyBom的APi文档示例项目 点击左边菜单栏可查看api示例 点击右边icon可进行增删改。
      `
    }
  },
  methods:{
      showList(){
        this.$emit('showList',true)
      },
      showIcon(){
        this.$emit('showIcon',true)
      }
  },
  mounted(){
    let _this = this
    Bus.$on('getDocument', (content) => {
      _this.titile = content.docName
      _this.handbook = ''
      if(content.docContent){
        _this.handbook = `${content.docContent}`
      }else{
        this.$message({
          message: '内容为空',
          type: 'warning'
        });
      }
    })
  }
}
</script>



<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix{
    text-align: center;
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    // padding: 0px 5px;
  }
  /deep/ .el-card__body{
    padding: 0px;
  }
  @media (max-width: 600px) {
  /deep/ .el-icon-menu {
    font-size: 20px;
    float: left;
    cursor: pointer;
    }
     /deep/ .el-icon-caret-bottom{
       font-size: 20px;
      float: right;
      cursor: pointer;
    }
  }
  @media (min-width: 600px) {
  /deep/ .el-icon-menu,.el-icon-caret-bottom  {
    display: none;
    }
  }
</style>