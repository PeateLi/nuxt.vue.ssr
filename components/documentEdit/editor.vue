<template>
    <div>
        <client-only><mavon-editor @change='getNewDoc' :toolbars="markdownOption" v-model="handbook == 'undefined'?text:handbook"/></client-only>
        <!-- {{data}} -->
    </div>
</template>


<script>
export default {
    data(){
        return {
            markdownOption:{
        fullscreen: true, // 全屏编辑
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      handbook:`${this.data.docContent}`,
      text:'**简要描述：** \n- 请求接口说明\n\n**请求URL：** \n- ` http://xx.com/xxx/xxxx/xxx `\n  \n**请求方式：**\n- get/post \n    \n-  请求传输字段\n\n|字段|类型|空|默认|注释|\n|:----    |:-------    |:--- |---|------      |\n|  参数一  |  参数类型   | 是否必须传参 | 参数默认值 |    参数注释         |\n|username |varchar(20) |否 |    |   用户名  |\n|password |varchar(50) |否   |    |   密码    |\n|name     |varchar(15) |是   |    |    昵称     |\n|reg_time |int(11)     |否   | 0  |   注册时间  |\n\n- 备注：传参备注\n\n **返回示例**\n\n``` \n  {\n    \"error_code\": 0,\n    \"data\": {\n      \"uid\": \"1\",\n      \"username\": \"12154545\",\n      \"name\": \"吴系挂\",\n      \"groupid\": 2 ,\n      \"reg_time\": \"1436864169\",\n      \"last_login_time\": \"0\",\n    }\n  }\n```\n\n **返回参数说明** \n\n|参数名|类型|说明|\n|:-----  |:-----|-----                           |\n|groupid |int   |用户组id，1：超级管理员；2：普通用户  |\n\n **备注** \n\n- 更多返回错误代码请看首页的错误代码描述\n\n\n'
        }
    },
    props:{
        data:{
            type:Object,
            default:() => {
                return {}
            }
        }
    },
    methods:{
        getNewDoc(val){
         this.$emit('getNewDocData',val)
        }
    },
    mounted(){
        let str = ''
    },
    watch:{
        data(val,old){
            if(val){
                  this.handbook = `${this.data.docContent}`
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>


