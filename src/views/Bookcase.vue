<template>
<div>
    <book-head/>
     <!-- 首页导航栏 可拆离-->
    <div class="top-nav-wrap">
        <div class="box-center">
                <ul class="cf">
                    <li>
                        <a href="#">古代言情</a>
                    </li>
                    <li>
                        <a href="#">都市言情</a>
                    </li>
                    <li>
                        <a href="#">玄幻仙侠</a>
                    </li>
                    <li>
                        <a href="#">悬疑科幻</a>
                    </li>
                    <li>
                        <a href="#">考古历史</a>
                    </li>
                    <li>
                        <a href="#">浪漫学园</a>
                    </li>
                    <li>
                        <a href="#">儿童文学</a>
                    </li>
                </ul>
        </div>

    </div>
    <!-- 我的书架 -->
    <div class="wrap" >
        <div class="main-wrap box-center cf">
                <!-- 左边我的基本信息 -->
                <div class="my-info-wrap f1">
                    <div class="my-bg">
                        <div class="info">
                            <!-- 我的头像和基本信息需要完善-->
                            <div class="avatar">
                                <img :src="head_src" alt="头像" v-if="head_src.slice(-3)=='jpg'">
                                <img src="../../public/images/head.png" alt="默认头像" v-else>
                            </div>
                            <h3>
                                <span v-text="`昵称:${user_info.name}`"></span>
                            </h3>
                            <p>个人宣言:</p>
                            <p v-text="user_info.sign"></p>
                        </div>
                    </div>                   
                </div>
                <!-- 右边我的书架 -->
                <div class="right-content f1">
                    <div class="content-wrap mb20">
                        <div class="content-head cf">
                            <div class="head-tab f1">
                                    <h1 class="lang" v-text="`我的书架(${bookNum})`"></h1>
                            </div>
                            <div class="sort-tab fr">
                                <a href="javascript:;" class="act">阅读时间</a>
                                <a href="javascript:;">更新时间</a>
                            </div>       
                        </div>
                        <div class="bookshelf-list-wrap">
                            <div class="bookshelf-list-wrap">
                                <table class="shelf-table">
                                    <tbody>
                                        <!-- tr鼠标滑过背景颜色有变化 -->
                                        <tr v-for="(elem,i) of bookCase" :key="i" @mouseenter="trenter" @mouseleave="trleave" >
                                            <td></td>
                                            <td>
                                                <input type="checkbox" class="input-checkbox" >
                                                <!-- ui-checkbox-checked这个类名是动态添加的 -->
                                                <label  class="ui-checkbox" @click="is_check" :selfID="elem.id"></label>
                                            </td>
                                            <td>
                                                <label class="label">
                                                    <div class="cf">
                                                        <div class="book-img">
                                                            <a href="#" target="_blank">
                                                                <img :src="elem.imageUrl" >
                                                                <i class="fin" v-text="`${elem.is_end?'已完结':'连载中'}`"></i>
                                                            </a>
                                                        </div>
                                                        <div class="info">
                                                            <h3>
                                                                <a href="#" v-text="elem.name"></a>                                                      
                                                            </h3>
                                                            <p v-text="`作者:${elem.authorName}`"></p>
                                                        </div>
        
                                                    </div>
        
                                                </label>
                                            </td>
                                            <td>
                                                <label  class="label">
                                                    <div class="chapter">
                                                        <h4>
                                                            <span></span>
                                                            <a href="#" target="_blank"  v-if="elem.lastChapterName" v-text="`更新至${elem.lastChapterName.slice(0,6)}`">
                                    
                                                            </a>
                                                            <cite>VIP</cite>
                                                        </h4>
                                                        <p>
                                                            <i>尚未阅读</i>
                                                        </p>
        
                                                    </div>
        
        
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                    <div class="btn">
                                                        <a href="#" target="_blank" class="red-btn">
                                                            立即阅读
                                                        </a>
                                                        <div class="hide-btn">
                                                            <a href="javascript:;" class="top-btn">置顶</a>
                                                            <a href="javascript:;" class="del-btn" @click="delSelf(elem.id)" >删除</a>
                                                        </div>
        
                                                    </div>
        
                                                </label>
        
                                            </td>
                                        </tr>                                                       
                                    </tbody>
                                </table>      
                            </div>
                            <!-- 分页 -->
                            <div class="page-box cf" v-if="bookNum>0">
                                <div class="pagination" data-page="1" data-pagemax="2">
                                    <div class="1bf-pagination">
                                        <ul class="1bf-pagination-item-list">
                                            <li class="1bf-pagination-item">
                                                <!-- 禁用1bf-pagination-disabled -->
                                                <a href="javascript:;" class="1bf-pagination-prev 1bf-pagination-disabled">＜</a>
                                            </li>
                                            
                                            <li class="1bf-pagination-item">
                                                <a href="javascript:;" class="1bf-pagination-prev lbf-pagination-current">1</a>
                                            </li>
        
                                            <li class="1bf-pagination-item">
                                                <a href="javascript:;" class="1bf-pagination-prev ">2</a>
                                            </li>
                                            <li class="1bf-pagination-item">
                                                <a href="javascript:;" class="1bf-pagination-next ">＞</a>
                                            </li>  
                                        </ul>
        
                                    </div>
        
                                </div>
        
                            </div>      
                        </div>      
                    </div>
                    <!-- 全选 -->
                    <div class="bottom-tool-bar" v-if="bookNum>0">
                        <div class="tool-bar">
                            <input type="checkbox" name="" id="j-bottomAll">
                            <label for="j-bottomAll" class="ui-checkbox checkbox_all" @click="check_all"></label>
                            <label for="j-bottomAll" @click="check_all" >全选</label>
                            <a href="javascript:;" @click="delAll">删除</a>       
                        </div>
        
                    </div>
    
                </div>  
        </div>
        
    </div>
    
    <book-foot/>
</div> 
</template>

<script>
export default {
    data(){
        return{
            bookNum:"",
            // 收藏书的信息
            bookCase:[], 
            // 个人信息
            user_info:{},
            head_src:"",
            //要删除的书籍的id列表
            delList:[]
        }
    },
    // 页面初始化
    created(){
        this.bookCaseLoad();     
    },
    methods:{
        // 封装ajax请求
        bookCaseLoad(){
            this.axios({
            method:"get",
            url:"v1/bookrack/", 
        })
        .then(res=>{
            console.log(res);
                this.bookCase=res.data.data.book.reverse();
                this.bookNum=res.data.data.book.length;
                this.user_info=res.data.data.user;
                // console.log(this.user_info);
                this.head_src= "http://176.209.103.9:8000/media/"+(res.data.data.user.avatar);
                // console.log(this.head_src);
            })       
        },
        trenter(e){
            e.target.classList.add("top");
        },
        trleave(e){
            e.target.classList.remove("top");
        },
        is_check(e){
            console.log("切换选中");
            e.target.classList.toggle("ui-checkbox-checked");
            if(e.target.classList.contains("ui-checkbox-checked")){
                this.delList.push(e.target.getAttribute("selfID"));
            }else{
                // 从数组中删除该id
                // 1.找到该书籍的索引位置
                var index=this.delList.indexOf(e.target.getAttribute("selfID"));
                // console.log(index);
                //2.用splice直接用数组中删除该书籍的id
                this.delList.splice(index,1);   
            };
            console.log(this.delList);
        },
        check_all(){
            console.log("全选");
            // 选中单选按钮
            var checkboxui=document.querySelectorAll(".ui-checkbox:not(.checkbox_all)");
            // console.log(checkboxui);
            // 全选按钮
            var checkboxall=document.getElementsByClassName("ui-checkbox checkbox_all")[0];
            // console.log(checkboxall);
            checkboxall.classList.toggle("ui-checkbox-checked");
            // 全选的状态
            var is_check_all=checkboxall.classList.contains("ui-checkbox-checked");
            // 单独的选中按钮的状态应该是和全选一致的
            if(is_check_all){   // 选中全选按钮
                for(var elem of checkboxui){
                    // 这里如果按钮本来是未选中状态才添加
                    if(! elem.classList.contains("ui-checkbox-checked")){
                        elem.classList.add("ui-checkbox-checked");
                        this.delList.push(elem.getAttribute("selfID"));
                    }                
                }
            }else{
                for(var elem of checkboxui){
                    elem.classList.remove("ui-checkbox-checked");
                    this.delList.pop(elem.getAttribute("selfID"));
                }
            };
            console.log(this.delList);       
        },
        // 封装删除的ajax请求
        bookCaseReload(){
            this.axios({
                method:"delete",
                url:"v1/bookrack/",
                contentType:"application/json",
                // dataType
                dataType:"json",
                data:{book_id:this.delList}, 
            })
            .then(res=>{
                 console.log(res);
                    if(res.data.code==200){
                    // 删除完数据及时刷新
                    this.bookCaseLoad();
                }  
            }) 
        },

        // 单独删除
        delSelf(book_id){
            this.delList.push(book_id);
            if(confirm("您确定要删除吗?")){
                this.bookCaseReload();
            } 
        },
        // 批量删除
        delAll(){
            if(confirm("您确定要删除吗?")){
                this.bookCaseReload();
            } 
        }
    },
  
}
</script>


<style>
    @import url('../assets/css/bookcase.css');
</style>