<template>
  <div id="screen" width="100%" height="100vh"></div>
</template>

<style scoped>
#screen{
    background-color: cadetblue;
    width: 100%;
    height: 100vh;
}

</style>

<script setup>
import { onMounted, ref } from 'vue'
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useVncStore } from "../../stores/useVncStore.js"

import RFB from '@novnc/novnc/core/rfb';

const router = useRouter();
const vncStore = useVncStore();
const rfbInstance = ref(null)

onMounted(()=>{
    console.log(router)
    connectVnc();
})

function disconnectedFromServer(msg){
    if(msg.detail.clean){
        ElNotification({
            title: "Warning",
            message: "远程桌面连接失败，正在尝试重连",
            type: "warning",
        });
        connectVnc();
    } else {
        ElNotification({
            title: "Error",
            message: "远程桌面连接失败，请检查网络和密码",
            type: "error",
        });
        setTimeout(function() {
            router.push('/ContainerManager');
        }, 1500);
    }
}

function connectedToServer(msg) {
  ElNotification({
    title: "Success",
    message: "远程桌面连接成功",
    type: "success",
  });
}

//连接vnc的函数      
function connectVnc() {
    let vncConnectConfig = vncStore.vncConnectConfig;
    const PASSWORD = vncConnectConfig.vncPasswd;
    const url=`wss://cd.glucy2.cn//vnc/${router.currentRoute.value.params.containerIp}/6001/connect`
    let rfb = new RFB(document.getElementById('screen'), url, {
        credentials: { password: PASSWORD }
    });
    rfb.addEventListener('connect', connectedToServer);
    rfb.addEventListener('disconnect', disconnectedFromServer);
    rfb.scaleViewport = true;
    rfb.resizeSession = true;
    rfb.showDotCursor = true;
    rfbInstance.value = rfb;
}
</script>
