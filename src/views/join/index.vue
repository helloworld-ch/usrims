<template>
  <div id="bbb">
    <p align="center">
      <button id="open" @click="open1">开启摄像头</button>
      <button id="close" @click="close">关闭摄像头</button>
      <button id="CatchCode" @click="CatchCode1">识别</button>
    </p>
    <div align="center" style="float: left;">
      <video id="video" width="600px" height="600px" autoplay></video>
      <canvas hidden="hidden" id="canvas" width="600" height="480"></canvas>
    </div>

  </div>
</template>
<script>
import {faceLogin} from "@/api/login";
export default {
  name: "index",
  data(){
    return{
      flag : false,
      imageSrc:"",
      context :"",
      canvas:"",
    }
  },
  methods: {
    open1(){
//判断摄像头是否打开
      if (!this.flag) {
        //调用摄像头初始化
        this.open2();
        this.flag = true;
      }
    },
    open2(){
      //获取摄像头对象
      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");

      //获取视频流
      let video = document.getElementById("video");
      var videoObj = {
        "video" : true
      }, errBack = function(error) {
        console.log("Video capture error: ", error.code);
      };
      this.context.drawImage(video, 0, 0, 330, 250);
      //初始化摄像头参数
      if (navigator.getUserMedia || navigator.webkitGetUserMedia
          || navigator.mozGetUserMedia) {
        navigator.getUserMedia = navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia;
        navigator.getUserMedia(videoObj, function(stream) {
          video.srcObject = stream;
          video.play();
        }, errBack);
      }
    },
    close(){
//判断摄像头是否打开
      if (this.flag) {
        video.srcObject.getTracks()[0].stop();
        this.flag = false;
      }
    },
    CatchCode1(){
      if (this.flag) {
        this.context.drawImage(video, 0, 0, 330, 250);
        this.CatchCode2();
      } else
        alert("请先开启摄像头!");
    },
    getBase64() {
      //获取当前图像并转换为Base64的字符串
      var imgSrc = this.canvas.toDataURL("image/png");
      //截取字符串
      // console.log(imgSrc)
      this.imageSrc = imgSrc.substr(22)
    },
    //访问后端
    CatchCode2() {
      //获取图像
      this.getBase64()
      console.log(this.imageSrc)
      this.$store.dispatch("LoginFace", this.imageSrc).then(response => {
        this.$message({
          type: "success",
          message: "登录成功"
        })
        this.close()
        this.$router.push({path: '/home'})
      }).catch(err => {
        this.$message({
          type: "error",
          message: "登录失败"
        })
        console.log(err)
      })

    },
  },
  created(){
    // this.open2()
  }
}
</script>
<style>
.result_img {
  width: 226px;
  height: 195px;
  background: #d8d8d8;
}
#bbb {
  width: 500px;
  text-align: center;
  margin: auto;
}
video{
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);    /* Safari 和 Chrome */
  -moz-transform: rotateY(180deg);
}
</style>
