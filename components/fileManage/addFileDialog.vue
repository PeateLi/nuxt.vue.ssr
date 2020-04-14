<template>
    <div>
        <el-dialog :title='dialogTitle' @close='hideDialog' :visible.sync='dialogAddFile'>
            <el-form :model="form">
                <el-form-item label="目录名">
                    <el-input v-model="form.name"  placeholder="请输入目录名" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级目录" :label-width="formLabelWidth">
                    <!-- <el-cascader @expand-change='removeNull' v-model="form.region" placeholder="请选择目录" :props="optionProps" :options="options.foldingMenuModels" clearable></el-cascader> -->
                    <el-select @change="changeFile" v-model="form.region" clearable placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.categoryID"
                        :label="item.categoryName"
                        :value="item.categoryID">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddFile = false">取消</el-button>
                <el-button type="primary" @click="dialogTitle=='新增目录'?submitAdd():submitEdit()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {addMeum,DropDownMenu,editMeum} from '../../api/meun'
import axios from 'axios'
export default {
    data(){
        return {
            optionProps:{   //级联选择配置选项
                value:'categoryID',
                label:'categoryName',
                children:'child'
            },
            formLabelWidth:'0px',
            dialogAddFile:this.addDialog,
            form:{
                name:'',
                region:'',
                leave:'',
                id:''
            },
            options:[]
        }
    },
    props:{
        addDialog:{
            type:Boolean,
            default:false
        },
        addFileParams:{
            type:Object,
            default:() => {
                return {}
            }
        },
        dialogTitle:{
            type:String,
            default:''
        }
    },
    methods:{
        hideDialog(){
            let _this = this
            _this.$emit('hideAddDialog',false)
             if (process.client) {   
                            history.go(0)
                        }
            _this.form = {
                 name:'',
                region:'',
                leave:'',
                id:''
            }
        },
        removeNull(row){
            console.log(row)
        },
        clearChildNull(arr){  //清除子选项空数组.
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(!element.child.length){
                    element.child = null
                }else{
                    this.clearChildNull(element.child)
                }
            }
            return arr
        },
        submitAdd(){
            let _this = this
            // if(_this.form.region == undefined){
            //     _this.form.region = 0
            // }
            let params = {
                CategoryID:0,
                CategoryName:_this.form.name,
                ParentID:_this.form.region,
                CategoryLevel:_this.form.leave+1,
                CreateTime:''
            }
            
           addMeum(params)
            .then(res => {
                if(res.code == 1000){
                     this.$message({
                            type:'success',
                            message:'添加成功！'
                      })

                _this.hideDialog()
                }else{
                     this.$message({
                        message: '添加失败',
                        type: 'warning'
                        });
                }
            })
            .catch(error =>{
                this.$message.error('请求出错'+error);
            })
        },
        submitEdit(){
             let _this = this
            let params = {
                CategoryID:_this.form.id,
                CategoryName:_this.form.name,
                ParentID:_this.form.region,
                CategoryLevel:_this.form.leave+1,
                CreateTime:''
            }
            editMeum(params)
            .then(res => {
                if(res.code == 1000){
                     this.$message({
                            type:'success',
                            message:'修改成功！'
                      })
                     
                _this.hideDialog()
                }else{
                     this.$message({
                        message: '修改失败',
                        type: 'warning'
                        });
                }
            })
            .catch(error => {
                  this.$message.error('请求出错'+error);
            })
        },
        getDownMeum(){
            let _this = this
            DropDownMenu()
            .then(res => {
               _this.options = res.data
                _this.options.unshift({
                    categoryName:'无',
                    categoryID:0,
                    categoryLevel:0
                })
            })
            .catch(error => {
                console.log(error)
            })
        },
        changeFile(val){
         let leave =  this.options.find(x => {
                return x.categoryID == val
            })

            this.form.leave = leave.categoryLevel
            this.form.region = leave.categoryID
            // this.form.id = leave.categoryID
        }
    },
    mounted(){
        this.getDownMeum()
    },
    watch:{
        addDialog(val){
            this.dialogAddFile = val
            this.form.name = ''
           if(this.addFileParams&&this.dialogTitle == '新增目录'){
             this.form.region = this.addFileParams.categoryID
             this.form.leave = this.addFileParams.categoryLevel
           }
           if(this.addFileParams&&this.dialogTitle == '编辑目录'){
               this.form.name = this.addFileParams.categoryName
               this.form.id = this.addFileParams.categoryID
                this.form.leave = this.addFileParams.categoryLevel
                 this.form.region = this.addFileParams.parentID
           }

        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-select{
    width: 100%;
}
/deep/ .el-form-item__label{
    width: 100% !important;
    text-align: left;
}
/deep/ .el-dialog{
    width: 380px;
}

</style>