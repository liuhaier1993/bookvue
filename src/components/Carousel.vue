<template>
<!-- 轮播图 -->
    <div class="sliderWrap" id="banner">
        <ul class="shuff-flag">
            <li class="cf">
                <a href="javascript:;">
                    <img src="../../public/images/banner/01.jpg">
                </a>                
            </li>
            <li class="cf">
                <a href="javascript:;">
                    <img src="../../public/images/banner/02.jpg">
                </a>                
            </li>
            <li class="cf">
                <a href="javascript:;">
                    <img src="../../public/images/banner/03.jpg">
                </a>                
            </li>
            <li class="cf">
                <a href="javascript:;">
                    <img src="../../public/images/banner/04.jpg">
                </a>                
            </li>
            <li class="cf">
                <a href="javascript:;">
                    <img src="../../public/images/banner/05.jpg">
                </a>                
            </li>             
        </ul>       
        <ul class="shuff-point">
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div id="thumbs">
            <li class="first btnPrev click-flag">
                <img src="../../public/images/kLeft.png" alt="上一个">
            </li> 
            <li class="last btnNext click-flag">
                <img src="../../public/images/kRight.png" alt="上一个">
            </li> 

        </div>                        
    </div>
    
</template>
<script>
export default {
    
}
</script>

<style>
    @import url('../assets/css/carousel.css');
</style>