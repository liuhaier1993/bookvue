<template>
<!--登录与注册切换控件(checked) -->

<div id="login" class="clearfix">	
        <input id="tab-1" type="radio" name="tab" class="sign-in hidden" />
        <input id="tab-2" type="radio" name="tab" class="sign-up hidden" />
        <input id="tab-3" type="radio" name="tab" class="sign-out hidden" />
        <div class="wrapper clearfix">
            <!-- 登录页面 -->
            <div class="login sign-up-htm clearfix" id="app_login" >
                <form action="#" method="post" class="container offset1 loginform">
                    <!-- 猫头鹰控件 -->
                    <div id="owl-login" class="register-owl" :class="change01">
                        <div class="hand"></div>
                        <div class="hand hand-r"></div>
                        <div class="arms">
                            <div class="arm"></div>
                            <div class="arm arm-r"></div>
                        </div>
                    </div>
                    <div class="pad input-container-reg">
                        <section class="content">
                            <ul >
                                <li class="clearfix" >
                                    <span class="input input--hideo">
                                        <input class="input__field input__field--hideo" type="text" id="register-username" v-model="log_name" 
                                            autocomplete="off" placeholder="请输入用户名"   @blur="uname_blur"/>
                                        <label class="input__label input__label--hideo" for="register-username">
                                            <i class="fa fa-fw fa-user icon icon--hideo"></i>
                                            <span class="input__label-content input__label-content--hideo"></span>
                                        </label>
                                    </span>
                                    <div class="tip">		
                                        <span class="info" v-text="uname_tip" ></span>
                                    </div>
                                    
                                </li>
                                <li class="clearfix" >
                                    <span class="input input--hideo">
                                        <input class="input__field input__field--hideo" type="password" id="register-password" v-model="log_upwd"
                                        autocomplete="off" placeholder="请输入密码"   @focus="upwd_focus"  @blur="upwd_blur"/>
                                        <label class="input__label input__label--hideo" for="register-password">
                                            <i class="fa fa-fw fa-lock icon icon--hideo"></i>
                                            <span class="input__label-content input__label-content--hideo"></span>
                                        </label>																			
                                    </span>
                                    <div class="tip">
                                        <span class="info" v-text="upwd_tip"></span>
                                    </div>					
                                </li>									
                            </ul>							
                        </section>
                    </div>
                    <div class="form-actions">
                        <router-link to="/reg" class="btn pull-left btn-link text-muted">没有账号？先注册</router-link>
                        <input class="btn btn-primary" type="button" @click="login" value="登录" 
                            style="color:white;"/>
                    </div>
                </form>
            </div>
        </div>
</div>
 
</template>

<script>
export default {
    data(){
        return{
            log_name:'',
            log_upwd:'',
            change01:{password:false},
            uname_tip:'',
            upwd_tip:'',
            // 是否触发ajax请求
            login_ajax:false,
        }
    },
    methods:{      
        // 用户名框失去焦点
        uname_blur(){
            if(!this.log_name){
                this.uname_tip="用户名不能为空";
                this.login_ajax=false;
            }else{
                this.uname_tip="";
                this.login_ajax=true;
            }
        },
        // 密码框获取焦点,猫头鹰遮住眼睛
        upwd_focus(){
            this.change01.password=true;
        },
        // 密码框失去焦点,猫头鹰
        upwd_blur(){
            this.change01.password=false;
            if(!this.log_upwd){
                this.upwd_tip="密码不能为空";
                this.login_ajax=false;
            }else{
                this.upwd_tip="";
                this.login_ajax=true;
            }
        }, 
      
    // 登录 
    login(){
        console.log("登录");
        // 如果用户没输入直接点击登录
        if(!this.log_name){
            this.uname_tip="用户名不能为空";
            this.login_ajax=false;
        };
        if(!this.log_upwd){
            this.upwd_tip="密码不能为空";
            this.login_ajax=false;
        }
        var formData = {
            readername:this.log_name,
            password:this.log_upwd,
        };
        if(this.login_ajax){
            this.axios({
                method:"post",
                url:"/v1/tokens",
                contentType:"application/json",
                dataType:"json",
                // data:JSON.stringify(formData),
                data:formData,
            })   
            .then((result)=>{
                console.log(result); 
                if(result.data.code==106 || result.data.code==105){
                    this.upwd_tip="用户名或密码错误";
                }
                if(result.data.code==200){
                alert("登录成功");
                //返回自己的首页之前存储token与用户名
                window.localStorage.setItem("reader_token",result.data.data.token);
                window.localStorage.setItem("readername",result.data.readername);
                // $router是一个程序,专门用于执行跳转动作
                this.$router.push("/");
                    }  
                }) 
            }  
        },  
    } 
}
</script>

<style>
    @import url('../assets/css/login_new.css');
</style>