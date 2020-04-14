import {post,get} from '~/plugins/server'

export const getMeunList = (p) => get('/EasyBom/DocCategory/SearchDefualtDropDownMenuList');


export const getCategoryList = (p) => get('/EasyBom/DocCategory/GetDonwDocAndCategoryList',p);   //获取菜单

export const deceteMeum = (p) => post('/EasyBom/DocCategory/DeleteCategory?CategoryID='+p)    //删除菜单



export const addMeum = (p) => post('/EasyBom/DocCategory/AddCategory',p) //新增菜单


export const DropDownMenu = (p) => get('/EasyBom/DocCategory/SearchDropDownMenuList') //获取下拉框菜单列表


export const editMeum = (p) => post('/EasyBom/DocCategory/UpdateCategory',p) //编辑菜单


export const getDoument = (p) => get('/EasyBom/DocApi/GetDocApiInfo?ID='+p)   //获取文档


export const deleteDoc = (p) => post('/EasyBom/DocApi/DelDocApi?ID='+p)   //获取文档

export const addDoc = (p) => post('/EasyBom/DocApi/AddDocApi',p)   //新增文档

export const editDoc = (p) => post('/EasyBom/DocApi/UpdateDocApi',p)   //编辑文档


export const searchDocApi = (p) => get('/EasyBom/DocApi/SearchDocApi?docName='+p)   //编辑文档
