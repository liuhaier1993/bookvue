<template>
<div>
    <!-- 引入全局组件页头部分 -->
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
    <!-- 个人设置 -->
    <div class="g-bd" >
        <!-- 基本信息 -->
        <div class="g-wrap" v-show="showBox">
            <div class="u-title">
                <h3>
                    <span class="f-ff2">个人设置</span>
                </h3>
            </div>
            <ul class="m-tabs f-cb">
                <li class="fst">
                    <a href="javascript:;">
                        <em>基本设置</em>
                    </a>
                </li>
                <li class="fst">
                    <a  href="javascript:;">
                        <em>绑定设置</em>
                    </a>
                </li>
                <li class="fst">
                    <a href="javascript:;">
                        <em>特别设置</em>
                    </a>
                </li>     
            </ul>
            <div class="change_info" >
                <!-- 个人信息文字 -->
                <div class="change_msg">
                    <p >
                        <label for="nickname">昵称:</label> 
                        <input type="text" id="nickname" v-model="nickname">  
                    </p>
                    <p>  
                        <label for="sign">个性签名:</label>
                        <input type="text" id="sign" v-model="sign">    
                    </p>
                    <p>
                        <label>性别:</label>
                        <label for="man">男
                            <input type="radio" name="gender" id="man" value="男" v-model="gender">
                        </label>
                        <label for="woman">女
                            <input type="radio" name="gender" id="woman" value="女" v-model="gender">
                        </label>   
                    </p>
                    <p>
                        <label for="email">邮箱:</label>
                        <input type="text" name="email" id="email" v-model="email" >
                    </p>
                    <button @click="changeInfo">
                        <span>保&nbsp;存</span>
                    </button>
                </div>
                <!-- 个人信息头像 -->
                <div class="change_img">  
                    <!-- 用户头像 -->
                    <!-- <img  class="head_img"  :src="src" v-if="src"> -->
                    <img  class="head_img"  :src="src" >
                    <!-- 默认头像 -->
                    <!-- <img  class="head_img" src="./images/头像.png" v-else> -->
                    <span class="btm"></span>
                     <!--点击切换到上传头像页面  -->    
                    <a href="javascript:;" class="upload_img" @click="changeBox" >更换头像</a>      
                </div>         
            </div>
        </div>
        <!-- 上传头像 -->
        <div class="g-wrap m-edtimg" v-show="!showBox">
            <div class="u-bread1">
                <a href="javascript:;" @click="changeBox">个人设置</a>
                <span class="arr">></span>
                <span class="f-fw1">更换头像</span>   
            </div>
            <!-- 上传头像 -->
            <div class="file">
                    <div class="file_upload" >          
                        <label class="ui_button" for="avatar">上传预览
                                <input type="file" name="avatar" id="avatar" 
                                accept="image/png, image/jpeg, image/gif, image/jpg" 
                            @change="changepic">  
                        </label> 
                        <span class="upload_tip">支持png、jpeg、jpg格式的图片，且文件小于20M</span>
                        <div class="m-edtimg left">
                            <div class="img ztag f-pr">
                                <img src="../../public/images/default_cover.png" alt="" class="dft ztag">
                            </div>

                        </div>
                    </div >   
                    <div class="file_prev">
                            <p class="prevtip">头像预览</p>
                            <p class="prev">
                                <img :src="src" class="prev_avatar avatar01" >
                                <span>大尺寸头像（180x180像素）</span>
                                <img :src="src" class="prev_avatar avatar02" >
                                <span>小尺寸头像(40x40像素)</span>
                            </p>   
                     </div>

            </div>
           <button @click="upload" class="save">保存</button>
           <button  @click="cancel"  class="cancel">取消</button>  

        </div>   
    </div>
    <book-foot/>

</div>
</template>

<script>
export default {
    data(){
        return{
            nickname:"",
            sign:"",
            gender:"",
            email:"",
            // 默认图片
            src:"./images/头像.png",
            // 默认图片2
            src01:"./images/头像.png",
            // 原始照片
            orignal_src:"",
            showBox:true,  
        }
    },  
    // 页面初始化
    beforeCreate(){
        console.log("页面初始化");
        var token = window.localStorage.getItem('reader_token');
        var username = window.localStorage.getItem('readername');
        if(!token || !username){
            this.$router.push("/");     
        }
    },
    // 页面刷新就get请求
    created(){
        console.log("测试ajax请求");
        var username = window.localStorage.getItem('readername');
        this.axios({
            // 请求方式
            method:"get",
            // url
            url:"v1/readers/" + username,      
        })
        .then(result=>{
            console.log(result);
            if(result.data.code==200){
                this.nickname=result.data.data.nickname;
                this.sign=result.data.data.sign;
                this.gender=result.data.data.gender;
                this.email=result.data.data.email;
                if(result.data.data.avatar){
                    // 但是属性不同,属性拿不到会报错
                    this.src="http://176.209.103.9:8000/media/"+(result.data.data.avatar);
                    // 保存原始图片
                    this.orignal_src="http://176.209.103.9:8000/media/"+(result.data.data.avatar);
                    } 
                }
            })
    },
    methods:{
        // 切换基本信息与上传头像
        changeBox(){
            console.log("切换");
            this.showBox=! this.showBox;
        }, 
        // 保存基本信息
        changeInfo(){
            console.log("修改个人信息")
          
            var username = window.localStorage.getItem('readername');
            var post_data = {'nickname':this.nickname,'sign':this.sign,'gender':this.gender,'email':this.email};
            this.axios({
                // 请求方式
                method:"put",
                url:"v1/readers/" + username,
                contentType:"application/json",
                dataType:"json", 
                data:post_data,               
                   
            })
            .then(result=>{
                if (200 == result.data.code){
                    alert("修改成功");
                    window.location.reload();
                }else{
                    alert("服务器繁忙,请稍后再试!");                 
                }
            })
        },
        // 预览图片
        changepic(e){
            // 获得目标元素
            console.log(e.target);
            //建立一個可存取到該file的url
            function getObjectURL(file) {
            var url = null ;
            // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
                console.log(url);
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
                console.log(url);
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
                console.log(url);
            }
            return url ;
            }
            this.src=getObjectURL(e.target.files[0]);
        },
        // 取消预览的图片
        cancel(){
            // 如果用户之前有上传图片,就用之前上传的
            if(this.orignal_src){
                this.src=this.orignal_src;
            // 如果没有就用默认的
            }else{
                this.src=this.src01;
            }     
        } ,
        // 上传图片
        upload(){
           
            var username = window.localStorage.getItem('readername');
            var url = 'v1/readers/' + username + '/avatar';
            var formdata = new FormData();
            // var avatar_file=$('#avatar')[0].files[0];
            var avatar_file=document.getElementById("avatar").files[0];
            console.log(avatar_file);
            formdata.append("avatar",avatar_file);
            this.axios({
                method:"post",
                url: url,
                processData: false,
                contentType: false,
                // enctype属性规定在发送到服务器之前应该如何对表单数据进行编码
                enctype:"multipart/form-data",   
                data: formdata,              
                })
                .then(result=>{
                    if (result.data.code == 200) {
                        alert('修改头像成功！');
                        // 修改成功,跳转到个人设置首页
                        this.showBox=! this.showBox;
                        window.location.reload();
                    } else {
                        alert('失败！')
                        }
                    })
                }, 
            },  
    }
</script>


<style>
    @import url('../assets/css/base.css');
    @import url('../assets/css/personal.css');
</style>