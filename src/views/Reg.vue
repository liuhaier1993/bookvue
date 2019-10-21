<template>
<!--登录与注册切换控件(checked) -->
	<div id="login" class="clearfix">	
		<input id="tab-1" type="radio" name="tab" class="sign-in hidden" />
		<input id="tab-2" type="radio" name="tab" class="sign-up hidden" />
		<input id="tab-3" type="radio" name="tab" class="sign-out hidden" />
		<div class="wrapper clearfix">
			<!-- 注册页面 -->
			<div class="login sign-up-htm clearfix" id="app_reg" >
				<form action="#" method="post" class="container offset1 loginform">
					<!-- 猫头鹰控件 -->
					<div id="owl-login" class="register-owl" :class="change02">
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
										<input class="input__field input__field--hideo" type="text" id="register-username" v-model="reg_name" 
											autocomplete="off" placeholder="请输入用户名"  @focus="uname_focus"  @blur="uname_blur"/>
										<label class="input__label input__label--hideo" for="register-username">
											<i class="fa fa-fw fa-user icon icon--hideo"></i>
											<span class="input__label-content input__label-content--hideo"></span>
										</label>
									</span>
									<div class="tip">		
										<i class="oriLeft correctLeft" v-show="uname_correct"></i>
										<span class="info" v-text="uname_tip" v-show="!uname_correct"></span>
									</div>
									
								</li>
								<li class="clearfix" >
									<span class="input input--hideo">
										<input class="input__field input__field--hideo" type="password" id="register-password" v-model="reg_upwd01"
										autocomplete="off" placeholder="请输入密码"  @focus="upwd01_focus" @blur="upwd01_blur"/>
										<label class="input__label input__label--hideo" for="register-password">
											<i class="fa fa-fw fa-lock icon icon--hideo"></i>
											<span class="input__label-content input__label-content--hideo"></span>
										</label>																			
									</span>
									<div class="tip">
										<span class="info" v-text="upwd01_tip"></span>
									</div>
									
								</li>
								<li class="clearfix" >
									<span class="input input--hideo">
										<input class="input__field input__field--hideo" type="password" id="register-repassword" v-model="reg_upwd02"
										autocomplete="off" placeholder="请确认密码"  @focus="upwd02_focus" @blur="upwd02_blur"/>
										<label class="input__label input__label--hideo" for="register-repassword">
											<i class="fa fa-fw fa-lock icon icon--hideo"></i>
											<span class="input__label-content input__label-content--hideo"></span>
										</label>										
									</span>
									<div class="tip">
											<i class="oriLeft correctLeft" v-show="upwd_correct"></i>
											<span class="info" v-text="upwd02_tip" v-show="!upwd_correct"></span>
									</div>	
								</li>
							</ul>							
						</section>
					</div>
					<div class="form-actions">
						<router-link to="/login" class="btn pull-left btn-link text-muted">已有账号?直接登录</router-link>
						<input class="btn btn-primary" type="button" @click="register" value="注册" 
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
            reg_name:'',
            reg_upwd01:'',
            reg_upwd02:'',
            change02:{password:false}, 
            // 用户名的提示
            uname_tip:'',
            // 密码提示
            upwd01_tip:'',
            // 密码是否一致
            upwd02_tip:'',
            // 用户名可用提示标志
            uname_correct:false,
            // 密码符合要求提示标志
            upwd_correct:false,
            // 密码符合要求
            upwd_check:false,
            // 是否发送ajax请求
            reg_ajax:false,

        }
    },
    methods:{ 
        // 输入用户名的提示
        uname_focus(){
            console.log("开始输入用户名");
            this.uname_correct=false;
            this.uname_tip="6-32位的数字或者字母,不能含其他字符";      
        },
        // 用户名输入框失去焦点
        uname_blur(){
            // 首先判断是否符合规则
            var reg=/^[0-9a-zA-Z]{6,32}$/;
            // 1.1用户名不能为空
            if(!this.reg_name){
                this.uname_tip="用户名不能为空";
                this.reg_ajax=false;
            }else if(this.reg_name.length<6 || this.reg_name.length>32){
                this.uname_tip="用户名的长度是6-32位";
                this.reg_ajax=false;
            }else if(!reg.test(this.reg_name)){
                this.uname_tip="用户名只能是数字或者字母"; 
                this.reg_ajax=false;  
            }else{
                this.axios({
                    method:"post", 
                    url:"v1/readers", 
                    contentType:"application/json",
                    dataType:"json",
                    data:{readername:this.reg_name},        
                })
                .then(result=>{
                    console.log(result);
                    if(result.data.code==206){
                    this.uname_tip="用户名已经存在,不可用";
                    }else{
                        this.uname_correct=true;
                        this.reg_ajax=true;
                    }
                })
            }         
        },
        // 输入密码的提示并控制猫头鹰手臂
        upwd01_focus(){
            this.change02.password=true; 
            this.upwd01_tip="6-32位字符(数字、字母、特殊字符)";              
        }, 
        // 密码框失去焦点 
        upwd01_blur(){
            this.change02.password=false;
            if(!this.reg_upwd01){
                this.upwd01_tip="密码不能为空";
                this.reg_ajax=false;
            }else if(this.reg_upwd01.length<6 || this.reg_upwd01.length>32){
                this.upwd01_tip="密码的长度是6-32位";
                this.reg_ajax=false;
            }else{
                this.upwd01_tip="";
                this.upwd_check=true;
            }          
        },
        upwd02_focus(){
            this.change02.password=true;
            this.upwd_correct=false;
            this.upwd02_tip="";
        },
        upwd02_blur(){
            this.change02.password=false;
            // 判断两次输入的密码是否一致
            if(this.reg_upwd01 !=this.reg_upwd02){
                this.upwd02_tip="您两次输入的密码不一致";
                this.reg_ajax=false;
            }else if (this.upwd_check){
                // 只有密码符合要求并且两次输入一致
                this.upwd_correct=true;
                this.reg_ajax=true;
            }
        }, 
        // 注册    
        register(){
            console.log("注册");
            console.log(this.reg_name);
            if(!this.reg_name){
                console.log(this.reg_name);
                this.uname_tip="用户名不能为空";
            }
            if(!this.reg_upwd01){
                this.upwd01_tip="密码不能为空";
            };
            if(!this.reg_upwd02){
                this.upwd02_tip="密码不能为空";
            };
            if(this.reg_upwd01 !=this.reg_upwd02){
                this.upwd02_tip="您两次输入的密码不一致";
            }
            if(this.reg_ajax){
                var formData = {
                    readername:this.reg_name,
                    password01:this.reg_upwd01,
                    password02:this.reg_upwd02,
                };
                this.axios({
                    method:"post",
                    url:"v1/readers",
                    contentType:"application/json",
                    dataType:"json",
                    data:formData
                })
                .then(result=>{
                console.log(result); 
                if(result.data.code==200){
                    console.log("注册成功");
                    // 返回自己的首页之前存储token与用户名
                    window.localStorage.setItem("reader_token",result.data.data.token);
                    window.localStorage.setItem("readername",result.data.readername);
                    // 跳转到主页
                    this.$router.push("/");
                    }  
                }) 

            }
             
        },    
    },   
}
</script>

<style>
    @import url('../assets/css/login_new.css');
</style>