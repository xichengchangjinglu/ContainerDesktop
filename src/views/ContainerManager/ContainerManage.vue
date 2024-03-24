<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <siderbar></siderbar>
  <user-header></user-header>
  <div class="content-main-container">
    <container-item v-for="(item,i) in nodeStore.containerList" :key="item" :container-info="item" :index="i"></container-item>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'HarmonyOS_Sans_SC_Regular';
    src: url('../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
}

.content-main-container{
  margin-left: 250px;
  margin-top: 80px;
  width: calc(100vw - 290px);
  display: flex;
  flex-wrap: wrap;
}
</style>

<script setup>
// 可以在这里添加组件的逻辑
import { onMounted,ref,reactive } from "vue"
import axios from "axios"
import { useTokenStore } from '../../stores/useTokenStore.js';
import { useNodeStore } from '../../stores/useNodeStore.js';

const tokenStore = useTokenStore();
const nodeStore = useNodeStore();
const containerListFilter = ref([]);

onMounted(() => {
  initInfo();
});

// 获取token、node名称和container信息
async function initInfo() {
    const ticketResponse = await axios.post("/api2/json/access/ticket", {
      "username": tokenStore.username,
      "password": tokenStore.password
    });

    tokenStore.setTicket(ticketResponse.data.data.ticket);
    tokenStore.setToken(ticketResponse.data.data.CSRFPreventionToken);
    document.cookie = `PVEAuthCookie=${tokenStore.getTicket()}`;
    // document.cookie = `CSRFPreventionToken=${ticketResponse.data.data.CSRFPreventionToken}`;

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
      (config) => {
        const cookie = document.cookie;
        if (cookie) {
          config.headers['Cookie'] = cookie;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
    });

    await axios.get("/api2/json/cluster/status").then((res)=>{
      const nodeName = res.data.data[0].name;
      nodeStore.nodeName = nodeName;
    })

    await axios.get("/api2/json/cluster/resources").then((res)=>{
      let containerList = res.data.data.filter((item)=>{
        return item.type == "lxc";
      });
      nodeStore.containerList = containerList;
      containerListFilter.value = containerList;
    })
}

</script>