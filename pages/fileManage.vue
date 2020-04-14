<template>
    <div class="file">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                    <el-button type="text" @click="addFile">添加目录</el-button>
                    <nuxt-link :to="{name:'index'}">
                    <el-button type="text">返回</el-button>
                    </nuxt-link>
            </div>
            <p>可拖动以排序</p>
            <file-three :fileList='meunData.data'></file-three>
        </el-card>
        <add-dialog dialogTitle='新增目录' :addDialog='addDialog' @hideAddDialog='hideAddDialog'></add-dialog>
    </div>
</template>

<script>
import {getMeunList} from '../api/meun'
export default {
    data(){
        return{
            addDialog:false,
        }
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
    components:{
        fileThree:() => import('~/components/fileManage/fileThree'),
        addDialog:() => import('~/components/fileManage/addFileDialog')
    },
    methods:{
        fileDoc(arr){
                arr.map(x => {
                   x = Object.assign(x,{child:x.meauLists.foldingMenuModels})   //生成tree渲染的结构
                   this.fileDoc(x.meauLists.foldingMenuModels)
                })
        },
        hideAddDialog(val){
            let _this = this
            _this.addDialog = val
        },
        addFile(){
            let _this = this
            _this.addDialog = true
        }
    },
    mounted(){
            this.fileDoc(this.meunData.data.foldingMenuModels)

    }
}
</script>


<style lang="scss" scoped>
.file{
    display: flex;
    justify-content: space-around;
}
.box-card{
    width:600px;
    min-height: 500px;
    max-height: 900px;
    overflow-y: auto;
    margin: 0px auto;
    margin-top: 200px;
    .clearfix{
        display: flex;
        justify-content: space-between;
        
    }
    p{
        color: #ccc;
        font-size: 12px;
        margin-bottom: 15px;
    }
}
/deep/ .el-card__header{
    border-bottom: 0px;
}

</style>