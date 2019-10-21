<template>
<div>
     <!-- 引入全局组件页头部分 -->
    <book-head/>
     <!-- 首页导航栏 可拆离-->
    <div class="top-nav-wrap">
        <div class="box-center">
                <ul class="cf">
                    <li>
                        <a href="javascript:;">古代言情</a>
                    </li>
                    <li>
                        <a  href="javascript:;">都市言情</a>
                    </li>
                    <li>
                        <a  href="javascript:;">玄幻仙侠</a>
                    </li>
                    <li>
                        <a  href="javascript:;">悬疑科幻</a>
                    </li>
                    <li>
                        <a href="javascript:;">考古历史</a>
                    </li>
                    <li>
                        <a  href="javascript:;">浪漫学园</a>
                    </li>
                    <li>
                        <a href="javascript:;">儿童文学</a>
                    </li>
                </ul>
        </div>
    </div>
    <!-- 主体部分 -->
    <div class="wraphx loaded">
        <div class="wrap-body" id="detail_app">
            <div class="flower left"></div>
            <div class="flower right"></div>
            <!-- 面包屑导航 -->
            <div class="crumbs-nav center1020">
                <span>
                    <a href="http://127.0.0.1:5500/book_2/1.index/index.html">首页</a>
                    <em class="iconfont">＞</em>
                    <a href="javascript:;"  v-text="details.classification"></a>
                    <em class="iconfont">＞</em>
                    <a href="javascript:;" v-text="`${details.is_end?'已完结':'连载中'}`"></a>
                    <em class="iconfont">＞</em>
                    <a href="javascript:;" v-text="details.name"></a>
                </span>
            </div>
            <!-- 图书详细信息 -->
            <div class="book-detail-wrap center1020" >
                <!-- 上部分 -->
                <div class="book-information cf">
                    <!-- 图片 -->
                    <div class="book-img">
                        <a href="#" class="J-getJumUrl default">
                            <img :src="details.imageUrl" alt="标签页">
                        </a>
                    </div>
                    <!-- 文字 -->
                    <div class="book-info">
                        <!-- 展开与收起功能有待完善 -->
                        <h1>
                            <em v-text="details.name"></em>
                            <a href="javascript:;" class="writer default" v-text="`作者:${details.authorName}`"></a>
                        </h1>
                        <p class="tag-box">
                            <span class="tag">
                                <i class="blue" v-text="`${details.is_end?'已完结':'连载中'}`"></i>
                                <i class="blue">签约</i>
                                <i class="org">VIP</i>
                                <i v-text="details.classification"></i>
                                <!-- <i>悬疑探险</i> -->
                            </span>
                        </p>
                        <p class="total">
                            <span v-text="details.word_count"></span>
                            <em>千字</em>
                            <i>|</i>
                            <span v-text="details.collection_amount"></span>
                            <em>总收藏</em>
                            <i>|</i>
                            <span v-text="details.click_volume"></span>
                            <em>总点击</em>
                        </p>
                        <p class="intro" v-if="details.introduction" v-text="`${details.introduction.slice(0,150)}...`">                                                     
                        </p>
                        <p class="btn">
                            <a href="#" class="border-btn J-getJumUrl">免费试读</a>
                            <a  @click="addbookcase" href="javascript:;" class="border-btn add-book">加入书架</a>
                        </p>
                    </div>

                </div>
                <!-- 作品信息与目录 -->
                <div class="content-nav-wrap cf">
                    <div class="nav-wrap f1">
                        <ul>
                            <!-- class="act"为选中颜色 -->
                            <li  :class="{act:isCheck}" @click="change">
                                <a href="javascript:;" class="lang">作品信息</a>
                            </li>
                            <li class="j_catalog_block"  :class="{act:!isCheck}" @click="change">
                                <a href="javascript:;" class="lang">
                                    目录
                                    <i>
                                        <span id="J-catalogCount" v-text="`(${num}章)`"></span>
                                    </i>
                                </a>
                            </li>
                        </ul>

                    </div>
                    <div class="update" v-if="num">
                        <p>
                            <a href="javascript:;" class="blue" v-text="`更新至${details.lastChapterName}`"></a>
                            <i>·</i>
                            <span>2天前</span>
                        </p>

                    </div>              
                </div>
                <!-- 作品讨论区 -->
                <div class="book-content-wrap cf" v-show="isCheck">
                    <!-- 左边 -->
                    <div class="left-wrap f1">
                        <div class="banner-wrap mb20">
                            <a href="javascript:;">
                                <img src="../../public/images/02.jpg">
                            </a>
                        </div>
                        <!-- 作品讨论区 -->
                        <div class="left-block-bg m-cmmt">
                            <div class="left-wrap-title">
                                <h3>作品讨论区</h3>
                            </div>
                            <!-- 这里是鼠标获取焦点时才显示的show -->
                            <div class="send-comment-wrap cf show">
                                <!-- 用户头像 -->
                                <div class="avatar f1">
                                    <img src="../../public/images/100.png" alt="">
                                </div>
                                <div class="send-comment-input f1">
                                    <div class="send-content">
                                        <textarea placeholder="输入评论内容" v-model="content"></textarea>
                                        <span class="count">
                                            <em>0/2000字</em>
                                        </span>
                                    </div>
                                    <div class="btn">
                                        <a href="javascript:;" class="blue" @click="reset">取消</a>
                                        <a href="javascript:;" class="red-btn" @click="submit">发表</a>

                                    </div>
                                   
                                </div>          
                            </div>
                            <!-- 用户的评论 -->
                            <div class="cmmts j-flag">
                                    <h3 class="u-hd4" v-text="`最新评论(${comment_count})`"></h3>
                                    <div id="65094981570870975834" class="itm" data-id="6509498" v-for="(elem,i) of comment" :key="i">
                                        <div class="head">
                                            <a href="#">
                                                <!-- 如果用户有头像 -->
                                                <img :src="elem.avatar" v-if="elem.avatar.slice(-3)=='jpg'">
                                                <img src="../../public/images/head.png" v-else>
                                            </a>
                                            </div>
                                            <div class="cntwrap">
                                                <div class="">
                                                    <div class="cnt f-brk">
                                                        <a href="#" class="s-fc7" v-text="elem.user_name"></a>
                                                        <span v-text="`:${elem.content}`"></span>
                                                    </div>
                                                    </div>
                                                    <div class="rp">
                                                        <div class="time s-fc4" v-text="elem.create_time"></div>
                                                        <a data-id="6509498" data-type="like" href="javascript:void(0)">
                                                            <i class="zan u-icn2 u-icn2-12"></i> (67.5万)
                                                        </a>
                                                        <span class="sep">|</span>
                                                    <a href="javascript:void(0)" class="s-fc3" data-id="6509498" data-type="reply">回复</a>
                                                </div>
                                            </div>
                                    </div>

                            </div>


                        </div>

                    </div>
                    <!-- 右边推荐 -->
                    <div class="right-wrap fr">
                        <div class="type-rec-wrap inner-wrap">
                            <h3 class="lang">同类推荐</h3>
                            <ul>
                                <li v-for="(elem,i) of recommend" :key="i">
                                    <div class="img-box">
                                        <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`">
                                            <img  :src="elem.imageUrl">
                                        </a>

                                    </div>
                                    <div class="book-info">
                                        <h4>
                                            <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`"  v-text="elem.name"></a>
                                        </h4>
                                        <p class="author">
                                            <a href="javascript:;" v-text="`作者：${elem.authorName}`"></a>
                                        </p>
                                        <p class="intro" v-text="`${elem.introduction.slice(0,20)}...`"></p>
                                    </div>
                                </li>
                            </ul>
                        </div>                       
                    </div>
                </div>

                <!-- 作品目录 -->
                <div class="catalog-content-wrap catalog-page" v-show="!isCheck">
                        <div class="volume-wrap">
                            <div class="volume">
                                <h3>
                                    <b v-text="details.name"></b>
                                    <i>·</i>
                                    <b v-text="`共${num}章`"></b>
                                    <span class="free">免费</span>
                                </h3>
                                <ul class="cf">
                                    <li data-rid="1">
                                        <a href="javascript:;" >楔子</a>
                                    </li>
                                    <li  v-for="(elem,i) of chapters" :key="i">
                                        <a :href="i==0?`http://127.0.0.1:5500/book_2/4.pages/page.html?id=${i+1}`:`http://127.0.0.1:5500/book/4.pages/page.html?id=${i+4}`" v-text="elem.name"></a>
                                    </li>
                                </ul>
    
                            </div>
                        </div>
    
                </div>
                  
            </div>

        </div>
    </div>
     <!-- 引入全局组件页尾部分 -->
    <book-foot/>
</div>

</template>

<script>
export default {
    data(){
        return{
        isCheck:true,
        // 图书详情
        details:{},
        // 推荐
        recommend:[],
        // 目录
        chapters:[],
        // 目录的数量
        num:"",
        // 提交的评论
        content:"",
        // 获取的评论
        comment:[],
        // 评论的数量
        comment_count:"",

        }
    },
    props:["id"],
    created(){
        if(this.id){
            console.log(this.id);    
            this.load();
        }
    },
    methods:{
        // 封装ajax请求
        load(){
             this.axios({
                url:"v1/book/"+this.id,
                type:"get",  //请求类型
                dataType:"json"//返回值类型
            })
            .then(res=>{
                console.log(res);
                if(res.data.code==200){
                    this.details=res.data.data;
                    this.recommend=res.data.data.recommend;
                    this.chapters=res.data.data.chapters;
                    this.num=res.data.data.chapters.length;
                    this.comment=res.data.data.comment.reverse();
                    this.comment_count=res.data.data.comment_count;
                }              
            })
        },
        change(){
            this.isCheck=!this.isCheck
        },
        addbookcase(){
            console.log("加入书架");
            // 先判断是否登录
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            if(token && username){
               this.axios({
                    // 请求方式
                    method:"post",
                    // url
                    url:"v1/bookrack/",
                     // contentType 
                    contentType:"application/json",
                     // dataType
                    dataType:"json",
                    data:{book_id:this.id}, 
                    headers: {'Authorization': token},                
                })
                .then(result=>{
                    console.log(result);
                    if(result.data.code==200){
                        alert("添加成功!");
                    }else{
                        alert("添加失败,本书已添加!");
                    }
                })             
            }else{
                alert("尚未登录,点击确定跳转到登录页面");
                this.$router.push("/login");
            }
        },
        reset(){
            this.content="";
        },
        submit(){
            console.log(this.content);
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            if(token && username){
                this.axios({
                    // 请求方式
                    method:"post",
                    // url
                    url:"v1/comment/"+this.id,
                     // contentType 
                    contentType:"application/json",
                     // dataType
                    dataType:"json",
                    data:{content:this.content}, 
                  
                })
                .then(result=>{
                    console.log(result);
                    if(result.data.code==200){
                        console.log("评论成功");
                        // 之间评论成功用的是刷新页面==>目的也是发送ajax请求,重新加载页面的数据(但是刷新页面会有抖动的效果)
                        // window.location.reload();
                        // 改用直接发送ajax请求的方式
                        // 清除评论内容
                        this.content="";
                        this.load();
                    }
                })           
            }else{
                alert("尚未登录,点击确定跳转到登录页面");
                this.$router.push("/login");
            }
        }
    },
    watch:{
        // $route第一个对象,仅负责地址栏中的路由信息
        "$route"(){
            console.log(this.$route);
        }
    }     
}
</script>

<style>
  @import url("../assets/css/base.css");
  @import url("../assets/css/detail.css");


</style>