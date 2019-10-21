<template>
    <div>
        <!-- 引入全局组件页头部分 -->
        <book-head/>
        <!-- 首页导航栏 可拆离-->
        <div class="top-nav-wrap">
            <div class="box-center">
                    <ul class="cf">
                        <li>
                            <a  href="javascript:;">古代言情</a>
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
                            <a  href="javascript:;">考古历史</a>
                        </li>
                        <li>
                            <a href="javascript:;">浪漫学园</a>
                        </li>
                        <li>
                            <a  href="javascript:;">儿童文学</a>
                        </li>
                    </ul>
            </div>
        </div>
        <!-- 首页展示logo与公告活动 -->
        <div class="pageHead">
            <!-- 展示书城logo和主打图片 -->
            <div class="mainNavWrap">
                <!-- logo -->
                <a class="yqLogo"  href="javascript:;" title="书院"></a>
                <!-- 主打图片 -->
                <a  href="javascript:;" class="topBanner">
                    <img src="../../public/images/iview.jpg" alt="img">
                </a>
            </div>
            <!-- 首页公告活动 -->
            <div class="index_notice cf">
                <div class="notice_left">
                    <h6>
                        <a href="javascript:;">甜爽超人气白金作家十月初携新书浪漫来袭</a>
                    </h6>
                    <p>
                        <a  href="javascript:;">逆世谋妃</a>
                    </p>
                </div>
                <div class="noticeList cf">
                    <ul>
                        <li>
                            <span>公告</span>
                            <em>|</em>
                            <a  href="javascript:;">西安站星学院作家班开班啦!</a>
                        </li>
                        <li>
                            <span>活动</span>
                            <em>|</em>
                            <a  href="javascript:;">网络乱象我举报志愿者招募!</a>
                        </li>    
                    </ul>
                    <ul>
                        <li>
                            <span>公告</span>
                            <em>|</em>
                            <a  href="javascript:;">歌唱祖国-全国网文优秀作品!</a>
                        </li>
                        <li>
                            <span>活动</span>
                            <em>|</em>
                            <a h href="javascript:;">长沙站星学院作家班开班啦!</a>
                        </li>    
                    </ul>
                    <ul>
                        <li>
                            <span>公告</span>
                            <em>|</em>
                            <a  href="javascript:;">中国网文发展报告调研!</a>
                        </li>
                        <li>
                            <span>活动</span>
                            <em>|</em>
                            <a  href="javascript:;">超人气大神作家顾染锦携新书!</a>
                        </li>    
                    </ul>

                </div>


            </div>
        </div>
        <!-- 页面实体 -->
        <div class="pageCenter" >
            <!-- 第一楼 -->
            <div class="indexOne mb10 cf">
                <!-- 一楼左侧 -->
                <div class="tabWrap tabSwitch f1 mr10" >
                    <div class="twoTabBox">
                        <span :class="{tabCur:isCheck}" @click="change01">本周强推
                            <cite></cite>
                        </span>
                        <span :class="{tabCur:!isCheck}" @click="change01">包月强推
                            <cite></cite>
                        </span>        
                    </div>
                    <div id="qtListBox" class="listWrap" >
                        <div class="tabList">
                            <ul class="rankList">
                                <li @mouseenter="qthover" @mouseleave="qtmove" v-for="(elem,i) of recommend" :key="i">
                                    <router-link :to="`/details/${elem.id}`"  class="bookTitle"  v-text="elem.name"></router-link>
                                    <!-- 默认图片是不显示的 -->
                                    <div class="bookInfoPopup" v-show="is_qthover">
                                        <div class="bookDataBox cf">
                                            <router-link :to="`/details/${elem.id}`">
                                                <img :src="elem.imageUrl" >
                                            </router-link>
                                            <div class="bookDataInfo">
                                                <h3>
                                                    <router-link :to="`/details/${elem.id}`" v-text="elem.name"></router-link>
                                                </h3>
                                                <p v-text="`作者:${elem.authorName}`"></p>
                                                <p>
                                                    总人气:
                                                    <span v-text="elem.click_volume"></span>
                                                </p>
                                                <p>
                                                    最新章节:
                                                    <span  v-text="`${elem.lastChapterName.slice(0,6)}...`"></span>
                                                </p>
                                                
                                            </div>
                                            <p class="intro">
                                                <span class="gray2">简介:</span>
                                                <em attr="inner:bookDesc;" v-text="`${elem.introduction.slice(0,70)}...`"></em>
                                            </p>

                                        </div>
                                        <p class="btn">
                                            <router-link  class="pinkBtn" :to="`/details/${elem.id}`">立即阅读</router-link>
                                            <a  href="javascript:" bid="15527062">加入书架</a>
                                        </p>

                                    </div>
                                </li>                                                                              
                                <li class="more">
                                    <a class="red"  href="javascript:;">更多...</a>
                                </li>
                            </ul>
                        </div>
                    </div>              
                </div>
                <!-- 一楼中间 -->
                <div class="indexOneCenter f1">
                    <!-- 轮播图 -->
                    <carousel/>
                    <!-- 销售周榜 -->
                    <div class="salesRank">
                        <div class="salesTab twoTabBox cf" id="salesTab">
                            <span class="tabCur">
                                <em>云起销售周榜</em>
                            </span>
                        </div>
                        <div id="salesListWrap" class="salesWrap">
                            <div class="salesList">
                                <ul class="cf">
                                    <li v-for="(elem,i) of rankList" :key="i">
                                        <!-- 类名还需要调整 -->
                                        <span :class="`n${i+1}`"></span>
                                        <router-link :to="`/details/${elem.id}`" v-text="elem.name"></router-link>
                                    </li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 一楼右边上半部分(最新上架) -->
                <div class="tabWrap mb10 fr">
                    <div class="threeTabBox">
                        <em>最新上架</em>
                    </div>
                    <!-- 上架排行 -->
                    <div class="rankListWrap">
                        <ul class="rankList rankHover numList">
                            <!-- 一本书 -->
                            <li :class="{firstList:i==0}" v-for="(elem,i) of newArrival" :key="i">
                                <!-- 文字 -->
                                <div class="hoverHide cf">
                                    <b :class="{num3:i<=2}"  v-text="i+1"></b>
                                    <a :href="`../3.details/details.html?id=${elem.id}`"  v-text="elem.name"></a>
                                </div>
                                <!-- 图片 -->
                                <div class="detailWrap" >
                                    <b :class="{num3:i<=2}" v-text="i+1"></b>
                                    <a :href="`../3.details/details.html?id=${elem.id}`" >
                                        <!-- 这里的图片还没绑定 -->
                                        <img src="../../public/images/new/01.jpg" alt="" width="55" height="74">
                                    </a>
                                    <div class="detailInfo">
                                        <h4>
                                            <a :href="`../3.details/details.html?id=${elem.id}`"  v-text="elem.name"></a>
                                        </h4>
                                        <p>
                                            作者:
                                            <a href="javascript:;"  v-text="elem.authorName"></a>
                                        </p>
                                    
                                        <p>
                                            分类:
                                            <a href="javascript:;"  v-text="elem.classification"></a>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        
                        </ul>
                    </div>      
                </div>
                <!-- 一楼右边下半部分 -->
                <div id="userBox" class="fr">
                    <!-- 大家都在看 -->
                <div class="tabWrap fr">
                    <div class="threeTabBox">
                        <em>大家都在看</em>
                    </div>
                    <div class="noLoginRecList">
                        <ul>
                                <li v-for="(elem,i) of clickList" :key="i">                           
                                    <span v-text="elem.classification"></span>
                                    <a :href="`../3.details/details.html?id=${elem.id}`" v-text="elem.name" ></a>
                                </li>                       
                        </ul>
                    </div>
                </div>
                </div>

            </div>
            <!-- 第一楼底部图片 -->
            <div class="fourBan cf">
                <a href="javascript:;" class="mr10">
                    <img src="../../public/images/fourBan/03.jpg"  width="206" height="90">
                </a>
                <a href="javascript:;" class="mr10">
                    <img src="../../public/images/fourBan/04.jpg"  width="280" height="90">
                </a>
                <a href="javascript:;" class="mr10">
                    <img src="../../public/images/fourBan/01.jpg"  width="280" height="90">
                </a>
                <a href="javascript:;" >
                    <img src="../../public/images/fourBan/02.jpg"  width="206" height="90">
                </a>
            </div>
            <!-- 第二楼 -->
            <div class="indexTwo mb10 cf">
                <!-- 二楼左侧 -->
                <div class="tabWrap f1 mr10">
                    <div class="threeTabBox">
                        <em>原创风云榜</em>
                    </div>
                    <div class="listWrap">
                        <ul class="rankList rankHover numList">
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a :href="`../3.details/details.html?id=97`">盛夏安澜</a>
                                </div>
                            </li>
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a :href="`../3.details/details.html?id=97`">盛夏安澜</a>
                                </div>
                            </li>
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a :href="`../3.details/details.html?id=97`">盛夏安澜</a>
                                </div>
                            </li>                    
                            <li class="more">
                                <a href="#" class="red">更多...</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <!-- 二楼中间 -->
                <div class="indexCenter">
                    <h6>古言·悬疑</h6>
                    <div class="centerTab">
                        <span class="act">单订</span>
                        <em>|</em>
                        <span>包月</span>
                    </div>
                    <div class="recBookWrap">
                        <div class="recBook cf">
                            <!-- 二楼中间左边 -->
                            <div class="twoBookWrap">
                                <div class="recBookBox"  v-for="(elem,i) of guyanxuanyi" :key="i" v-show="i<=2">
                                    <a :href="`../3.details/details.html?id=${elem.id}`" >
                                        <img :src="elem.imageUrl"  width="78px" height="113px">
                                    </a>
                                    <div class="recBookInfo">
                                        <h3>
                                            <a :href="`../3.details/details.html?id=${elem.id}`" v-text="elem.name"></a>
                                        </h3>
                                        <p v-text="elem.introduction.slice(0,21)"></p>
                                        <a :href="`../3.details/details.html?id=${elem.id}`" class="read">[点击阅读]</a>

                                    </div>
                                </div>
                            </div>
                            <!--二楼中间右边  -->
                            <div class="moreBookRec">
                                <ul class="moreList">
                                    <li v-for="(elem,i) of guyanxuanyi" :key="i" v-show="i>=3 && i<=15">
                                        <a :href="`../3.details/details.html?id=${elem.id}`" v-text="elem.name" t></a>
                                    </li>
                                </ul>
                            </div>                 
                        </div>
                    </div>
                </div>
                <!-- 二楼右边 -->
                <div class="tabWrap tabSwitch fr">
                    <a href="javascript:;">
                        <img src="../../public/images/guyan/right.jpg" alt="" width="206" height="452">
                    </a>
                </div>
            </div>
            <!-- 三楼 -->
            <div class="indexTwo mb10 cf">
                <!-- 三楼左侧 -->
                <div class="tabWrap f1 mr10">
                    <div class="threeTabBox">
                        <em>云起新秀榜</em>
                    </div>
                    <div class="listWrap">
                        <ul class="rankList rankHover numList">
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="../3.details/details.html?id=100">美人心慈</a>
                                </div>
                            </li>
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="../3.details/details.html?id=100">美人心慈</a>
                                </div>
                            </li>
                            
                            <li class="more">
                                <a href="javascript:;" class="red">更多...</a>
                            </li>

                        </ul>
                    </div>
                </div>
                <!-- 三楼中间 -->
                <div class="indexCenter">
                    <h6>现言·青春</h6>
                    <div class="centerTab">
                        <span class="act">单订</span>
                        <em>|</em>
                        <span>包月</span>
                    </div>
                    <div class="recBookWrap">
                            <div class="recBook cf">
                                <!-- 三楼中间左边 -->
                                <div class="twoBookWrap">
                                    <div class="recBookBox"  v-for="(elem,i) of xianyanqingchun" :key="i" v-show="i<=2">
                                        <a :href="`../3.details/details.html?id=${elem.id}`" >
                                            <img :src="elem.imageUrl"  width="78px" height="113px">
                                        </a>
                                        <div class="recBookInfo">
                                            <h3>
                                                <a :href="`../3.details/details.html?id=${elem.id}`" v-text="elem.name" ></a>
                                            </h3>
                                            <p v-text="elem.introduction.slice(0,21)"></p>
                                            <a :href="`../3.details/details.html?id=${elem.id}`" class="read" >[点击阅读]</a>
        
                                        </div>
                                    </div>
                                </div>
                                <!--三楼中间右边  -->
                                <div class="moreBookRec">
                                    <ul class="moreList">
                                        <li v-for="(elem,i) of xianyanqingchun" :key="i" v-show="i>=3 && i<=15">
                                            <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`" v-text="elem.name" ></a>
                                        </li>
                                    </ul>
                                </div>                 
                            </div>
                        </div>             
                </div>
                <!-- 三楼右边 -->
                <div class="tabWrap tabSwitch fr">
                    <a href="javascript:;">
                        <img src="../../public/images/xianyan/right.jpg" alt="" width="206" height="452">
                    </a>
                </div>
            </div>
            <!-- 四楼 -->
            <div class="indexTwo mb10 cf">
                <!--四楼左侧 -->
                <div class="tabWrap f1 mr10">
                    <div class="threeTabBox">
                        <em>原创风云榜</em>
                    </div>
                    <div class="listWrap">
                        <ul class="rankList rankHover numList">
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            <li >
                                <div class="hoverHide">
                                    <em>17212</em>
                                    <a href="http://127.0.0.1:5500/book_2/3.details/details.html?id=98">吾欲成凰</a>
                                </div>
                            </li>
                        
                            
                            <li class="more">
                                <a href="javascript:;" class="red">更多...</a>
                            </li>
                            



                        </ul>


                    </div>
                </div>
            <!-- 四楼中间 -->
            <div class="indexCenter">
                    <h6>幻情·科幻</h6>
                    <div class="centerTab">
                        <span class="act">单订</span>
                        <em>|</em>
                        <span>包月</span>
                    </div>
                    <div class="recBookWrap">
                            <div class="recBook cf">
                                <!-- 三楼中间左边 -->
                                <div class="twoBookWrap">
                                    <div class="recBookBox"  v-for="(elem,i) of huanqingkehuan" :key="i" v-show="i<=2">
                                        <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`" >
                                            <img :src="elem.imageUrl"  width="78px" height="113px">
                                        </a>
                                        <div class="recBookInfo">
                                            <h3>
                                                <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`" v-text="elem.name" ></a>
                                            </h3>
                                            <p v-text="elem.introduction.slice(0,21)"></p>
                                            <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`" class="read" >[点击阅读]</a>
        
                                        </div>
                                    </div>
                                </div>
                                <!--三楼中间右边  -->
                                <div class="moreBookRec">
                                    <ul class="moreList">
                                        <li v-for="(elem,i) of huanqingkehuan" :key="i" v-show="i>=3 && i<=15">
                                            <a :href="`http://127.0.0.1:5500/book_2/3.details/details.html?id=${elem.id}`" v-text="elem.name" ></a>
                                        </li>
                                    </ul>
                                </div>                 
                            </div>
                        </div>             
                </div>
                <!-- 四楼右边 -->
                <div class="tabWrap tabSwitch fr">
                    <a href="javascript:;">
                        <img src="../../public/images/kehuan/right.jpg" alt="" width="206" height="452">
                    </a>
                </div>
            </div>
        </div>
        <!-- 引入全局组件页尾部分 -->
        <book-foot/>
    </div>
</template>

<script>
// 引入子组件
// import Carousel from "../components/Carousel"
// 也可以这样写(@是src的简写,但是这种简写方式只能在js里面用?)   carousel:html中要用到的标签名
import carousel from "@/components/Carousel"

export default {
    data(){
        return{
        isCheck:true, 
        // 默认图片是不显示的
        is_qthover:false,
        // 本周强推
        recommend:[],
        // 云起销售榜
        rankList:[],
        // 最新上架
        newArrival:[],
        // 大家都在看
        clickList:[],
        // 古言悬疑
        guyanxuanyi:[],
        // 现言青春
        xianyanqingchun:[],
        // 幻情科幻
        huanqingkehuan:[]
        }
    },
    components:{carousel},
    created(){
        console.log("页面加载完成");
        this.axios({
        method:"get",
        // url:"http://176.209.103.9:8000/index/", 
        // 基础路由已经配置,只需要写后面的路径就可以 
        url:"index/",  
        })
        .then(result=>{
            console.log(result);
            if(result.data.code==200){
                this.recommend=result.data.data.recommend;
                this.rankList=result.data.data.rankList;
                this.newArrival=result.data.data.newArrival;
                this.clickList=result.data.data.clickList;
                this.guyanxuanyi=result.data.data.guyanxuanyi;
                this.xianyanqingchun=result.data.data.xianyanqingchun;
                this.huanqingkehuan=result.data.data.huanqingkehuan;
            }         
        })
    },  
    methods:{
        // 切换本周强推与包月
        change01(){
            this.isCheck=!this.isCheck;
        },
        // 本周强推
        qthover(e){
            e.target.lastElementChild.style.display="block";
        },
        qtmove(e){
            e.target.lastElementChild.style.display="none"; 
        },
    },
}
</script>

<style>
    @import url('../assets/css/base.css');
    @import url('../assets/css/index.css');
</style>