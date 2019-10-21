<template>
    <!-- 顶部导航 可拆离-->
    <div class="topNav">
        <div class="pageHead">
             <!-- 登录注册 左边-->
            <div class="loginBox" id="login_app">
                <!-- 登录之前  isLogin一开始就是false-->
                <div class="login_before" v-if="!isLogin">    
                    <router-link class="reg" to="/reg">注册</router-link>
                    <span class="navline">|</span>
                    <!-- 全局组件跳转到页面的组件to前面不加: -->
                    <router-link class="login" to="/login">登录</router-link>
                </div>
                <!-- 登录之后显示头像和书架信息也可以进入个人设置 -->
                <div class="login_after" v-else>
                    <!-- 显示头像 -->
                    <ul class="cf">
                        <span v-text="`欢迎您,书友:${readername}`" class="welcom"></span>           
                        <li @mouseenter="mousein" @mouseleave="mouseout">                           
                            <a href="#" class="head_img" >
                                <!-- 用于上传的头像 -->
                                <img :src="src" class="header_log" v-if="src">
                                <!-- 默认的头像 -->
                                <img src="../../public/images/head.png"  class="header_log" v-else>
                            </a>
                            <ul class="login_out" v-show="isHover">
                                <li><router-link to="/personal">我的主页</router-link></li>
                                <li><router-link to="/personal">个人设置</router-link></li>
                                <li><a href="javascript:;" @click="logout">退出</a></li>
                            </ul>        
                        </li>
                        <li>
                             <!-- 我的书架 -->
                            <router-link to="/bookcase" class="mybook" >我的书架
                                <em class="bookicon"></em>
                            </router-link>
                        </li>
                    </ul>       
                </div>
            </div>
            <!-- 筛选框右边-->
            <div class="searchBox">
                <input type="text" class="search-box"  placeholder="理想三旬" autocomplete="off">
                <input type="text" class="submit-input" id="search-submit">
                <label for="search-submit" class="search-btn">
                    <em class="iconfont"></em>
                </label>  
            </div>
        </div>    
    </div>   
</template>

<script>
export default {
    data(){
        return{
             // 切换是否登录
        isLogin:false,
        // 切换头像下面的菜单
        isHover:false,
        // 头像
        src:"",
        readername:"",

        }
    },
    // 让页头去请求是否登录拿头像
    created(){
        console.log("测试ajax请求");
        var username = window.localStorage.getItem('readername'); 
        this.axios({
            method:"get",
            url: "v1/readers/"+username,
        })
        .then((result)=>{
            console.log(result);
            if(result.data.readername){
                console.log("已经登录");
                this.isLogin=true;
                this.readername=result.data.readername;        
                if(result.data.data.avatar){
                    console.log("有头像");
                    this.src="http://176.209.103.9:8000/media/"+(result.data.data.avatar);
                }
            }
        })  
    },
    methods:{
        // 切换头像下面的菜单
        mousein(){
            this.isHover=true;
        },
        mouseout(){
            this.isHover=false;
        },
        // 退出
        logout(){
            console.log("退出");
            window.localStorage.removeItem('reader_token');
            window.localStorage.removeItem('readername');
            var token = window.localStorage.getItem('reader_token');
            var username = window.localStorage.getItem('readername');
            if (!token && !username){
                alert("退出成功");
                // 这里只能刷新页面
                window.location.reload();
                // 不能跳转到首页?(因为自己是全局组件？)
                // this.$router.push("/");
            }
        }
    } 
}
</script>


<style>
    @import url('../assets/css/head.css');
</style>