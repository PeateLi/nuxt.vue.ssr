<template>
    <div>
        <el-tree
        v-loading="treeLoading"
        :data='fileList.foldingMenuModels'
        :props="defaultProps"
        node-key='categroyID'
        default-expand-all
        @node-drag-stars='handleDragStart'
        @node-drag-enter='handleDragEnter'
        @node-drag-leave='handleDragLeave'
        @node-drag-over='handleDragOver'
        @node-drag-end='handleDragEnd'
        @node-drop='handleDrop'
        draggable
        :allow-drop='allowDrop'
        :allow-drag='allowDrag'>
        <span class="custom-tree-node" slot-scope="{node,data}">
            <span>{{node.label}}</span>
            <span>
                <el-button type="text" @click="editFile(node)"><i class="el-icon-edit"></i></el-button>
                <el-button type="text" @click="addFile(node)"><i class="el-icon-plus"></i></el-button>
                <el-button type="text" @click="deleteFile(node)"><i class="el-icon-delete"></i></el-button>
            </span>
        </span>
        </el-tree>
        <add-file-dialog :dialogTitle='dialogTitle'  :addDialog='addDialog' :addFileParams='addFileParams' @hideAddDialog='hideAddDialog'></add-file-dialog>
    </div>
</template>

<script>
import {deceteMeum} from '../../api/meun'
export default {
    data(){
        return{
            data:[],
            defaultProps:{
                children:'child',
                label:'categoryName'
            },
           addDialog:false,
           dialogTitle:"",
           addFileParams:{},
           treeLoading:true
        }
    },
    components:{
        addFileDialog:() => import('./addFileDialog')
    },
    props:{
        fileList:{
            type:Object,
            default:() => {
                return {}
            }
        }
    },
    methods:{
        handleDragStart(node,ev){
            console.log('drag start',node)
        },
        handleDragEnter(draggingNode,dropNode,ev){
            console.log('tree drag enter',dropNode)
        },
        handleDragLeave(draggingNode,dropNode,ev){
            console.log('tree drag leave',dropNode)
        },
        handleDragOver(draggingNode,dropNode,ev){
            console.log('tree drag over:',dropNode)
        },
        handleDragEnd(draggingNode,dropNode,dropType,ev){
            console.log('tree drag end:',dropNode&&dropNode,dropType)
        },
        handleDrop(draggingNode,dropNode,dropType,ev){
            console.log('tree drop',dropNode,dropType)
        },
        allowDrop(draggingNode,dropNode,type){
            if(dropNode.data.label == '二级3-1'){
                return type !== 'inner';
            }else{
                return true
            }
        },
        allowDrag(draggingNode){
            return draggingNode.data.categoryName.indexOf('三级 3-2-2') === -1;
        },
        deleteFile(fileName){
            let _this = this
            _this.$confirm('确定删除目录嘛？此操作会把该目录下面的所有页面一并删除，请谨慎操作','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning',
            })
            .then(() =>{
                deceteMeum(fileName.data.categoryID)
                .then(res =>{
                    if(res.code == 1000){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        })
                        if (process.client) {   
                            history.go(0)
                        }
                    }else{
                        this.$message({
                        message: '删除失败',
                        type: 'warning'
                        });
                    }
                })
                .catch(error => {
                   this.$message.error('请求出错'+error);
                })
            })
            .catch(() => {
                this.$message({
                    type:'info',
                    message:'已经取消删除'
                })
            })
            
        },
        addFile(fileName){
            let _this = this
            _this.dialogTitle = '新增目录'
            _this.addFileParams = fileName.data
            _this.addDialog = true
        },
        editFile(fileName){
            let _this = this
            _this.dialogTitle = '编辑目录'
            _this.addFileParams = fileName.data
            _this.addDialog = true
        },
        hideAddDialog(val){
            let _this = this
            _this.addDialog = val
        },
        
    },
    mounted(){
        this.treeLoading = false
        console.log(this.fileList)
    },
}
</script>

<style lang="scss" scoped>
.custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding-right: 8px;
}
</style>