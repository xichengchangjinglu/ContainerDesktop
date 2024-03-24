<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <siderbar></siderbar>
  <user-header></user-header>
  <div class="content-container">
    <div class="total">
      <div class="total-title">
        <p class="total-title-left">信息总览</p>
        <p class="total-title-right">截止至 {{ curretTime }}</p>
      </div>
      <div class="detail">
        <div>
          <p class="detail-number">{{ totalInfo.totalNum }}</p>
          <p class="detail-des">总计容器</p>
        </div>
        <div>
          <p class="detail-number">{{ totalInfo.runNum }}</p>
          <p class="detail-des">运行中</p>
        </div>
        <div>
          <p class="detail-number">{{ totalInfo.storeCurrent }}MB</p>
          <p class="detail-des">总计存储</p>
        </div>
        <div>
          <p class="detail-number">10GB</p>
          <p class="detail-des">存储配额</p>
        </div>
        <div>
          <p class="detail-number">{{ totalInfo.cpuUsed }}%</p>
          <p class="detail-des">CPU占用</p>
        </div>
      </div>
    </div>
    <div class="select-wrapper">
      <div>
        <select v-model="containerSelectedValue" class="container-select">
          <option
            v-for="option in containerOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <img
          src="../../assets/images/select.png"
          class="select-container-img"
        />
      </div>
      <div>
        <select v-model="timeSelectedValue" class="time-select">
          <option
            v-for="option in timeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <img src="../../assets/images/select.png" class="select-time-img" />
      </div>
      <div class="search-btn" @click="searchIndicator()">
        <img src="../../assets/images/refresh.png" alt="" />
        <p>查询</p>
      </div>
    </div>
    <div class="indicator-wrapper">
      <p class="indicator-title">详细数据</p>
      <div class="indicator-container">
        <div class="indicator-container-left">
          <p class="indicator-container-left-up">CPU使用率</p>
          <p v-if="indicatorStore.data.length!=0" class="indicator-container-left-down">{{indicatorCurrent.cpu.toFixed(2)}}%</p>
          <p v-else class="indicator-container-left-down">NAV</p>
        </div>
        <div
          id="indicator-container-right-cpu"
          style="width: calc(100vw - 430px); height: 350px"
        ></div>
      </div>
      <div class="indicator-container">
        <div class="indicator-container-left">
          <p class="indicator-container-left-up">网路输入</p>
          <p v-if="indicatorStore.data.length!=0" class="indicator-container-left-down">{{indicatorCurrent.netin.toFixed(2)}}kb</p>
          <p v-else class="indicator-container-left-down">NAV</p>
        </div>
        <div
          id="indicator-container-right-netin"
          style="width: calc(100vw - 430px); height: 350px"
        ></div>
      </div>
      <div class="indicator-container">
        <div class="indicator-container-left">
          <p class="indicator-container-left-up">网络输出</p>
          <p v-if="indicatorStore.data.length!=0" class="indicator-container-left-down">{{indicatorCurrent.netout.toFixed(2)}}k</p>
          <p v-else class="indicator-container-left-down">NAV</p>
        </div>
        <div
          id="indicator-container-right-netout"
          style="width: calc(100vw - 430px); height: 350px"
        ></div>
      </div>
      <div class="indicator-container">
        <div class="indicator-container-left">
          <p class="indicator-container-left-up">Mem占用</p>
          <p v-if="indicatorStore.data.length!=0" class="indicator-container-left-down">{{indicatorCurrent.mem.toFixed(0)}}MB</p>
          <p v-else class="indicator-container-left-down">NAV</p>
        </div>
        <div
          id="indicator-container-right-mem"
          style="width: calc(100vw - 430px); height: 350px"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "HarmonyOS_Sans_SC_Bold";
  src: url("../../assets/fonts/HarmonyOS_Sans_SC_Bold.ttf") format("truetype");
}

@font-face {
  font-family: "HarmonyOS_Sans_SC_Regular";
  src: url("../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf")
    format("truetype");
}

.content-container {
  position: relative;
  top: 90px;
  left: 250px;
  width: calc(100vw - 290px);
}

.total {
  height: 170px;
  background-color: #ffffff;
  border-radius: 10px;
}

.total-title {
  display: flex;
  width: 97%;
  justify-content: space-between;
  margin-left: 20px;
  align-items: flex-end;
}

.total-title-left {
  font-family: "HarmonyOS_Sans_SC_Bold", sans-serif;
  font-size: 16px;
  color: #202020;
}

.total-title-right {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 12px;
  color: #202020;
}

.detail {
  background-color: #f3f7fc;
  width: 97%;
  height: 100px;
  margin-left: 20px;
  display: flex;
  border-radius: 10px;
  justify-content: space-around;
}

.detail-number {
  font-family: "HarmonyOS_Sans_SC_Bold", sans-serif;
  font-size: 20px;
  color: #202020;
  margin-top: 25px;
}

.detail-des {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 12px;
  color: #202020;
  margin-top: -10px;
}

.detail div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.select-wrapper {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.container-select {
  width: 230px;
  height: 38px;
  margin-right: 10px;
  border-color: #ffffff;
  border-radius: 7px;
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 14px;
  color: #0a1629;
  padding-left: 17px;
  outline: none;
  cursor: pointer;
}

.time-select {
  width: 150px;
  height: 38px;
  border-color: #ffffff;
  border-radius: 7px;
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 14px;
  color: #0a1629;
  padding-left: 17px;
  outline: none;
  cursor: pointer;
}

.select-container-img {
  position: absolute;
  left: 195px;
  top: 192px;
}

.select-time-img {
  position: absolute;
  left: 360px;
  top: 192px;
}

.search-btn {
  display: flex;
  background-color: #ffffff;
  height: 38px;
  align-items: center;
  margin-left: 10px;
  border-radius: 7px;
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 14px;
  color: #0a1629;
  cursor: pointer;
}

.search-btn img {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}

.search-btn p {
  margin-left: 10px;
  margin-right: 10px;
}

.indicator-wrapper {
  position: fixed;
  width: calc(100vw - 290px);
  background-color: #ffffff;
  top: 330px;
  border-radius: 10px;
  bottom: 20px;
  overflow: auto;
}

.indicator-title {
  font-family: "HarmonyOS_Sans_SC_Bold", sans-serif;
  font-size: 16px;
  color: #202020;
  margin-left: 20px;
  margin-top: 20px;
}

.indicator-container {
  height: 150px;
  margin-left: 20px;
  width: calc(100vw - 330px);
  margin-bottom: 50px;
  display: flex;
  align-items: center;
}

.indicator-container-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80px;
}

.indicator-container-right {
  width: 500px;
  height: 150px;
}

.indicator-container-left-up {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 16px;
  color: #0a1629;
}

.indicator-container-left-down {
  font-family: "HarmonyOS_Sans_SC_Bold", sans-serif;
  font-size: 25px;
  color: #0a1629;
  margin-top: -15px;
}
</style>

<script setup>
import { onMounted, ref, reactive } from "vue";
import * as echarts from "echarts";
import { useNodeStore } from "../../stores/useNodeStore.js";
import { useTokenStore } from "../../stores/useTokenStore.js";
import { useIndicatorStore } from "../../stores/useIndicatorStore.js";
import { ElNotification } from "element-plus";
import axios from "axios";

const containerSelectedValue = ref("none");
const containerOptions = ref([{ value: "none", label: "容器选择" }]);

const timeSelectedValue = ref("none");
const timeOptions = ref([
  { value: "none", label: "时间选择" },
  { value: "hour", label: "hour" },
  { value: "day", label: "day" },
  { value: "week", label: "week" },
  { value: "month", label: "month" },
  { value: "year", label: "year" },
]);
const curretTime = ref("");
const totalInfo = reactive({
  totalNum: "",
  runNum: "",
  storeCurrent: "",
  storeTotal: "",
  cpuUsed: "",
});
const indicatorCurrent = reactive({
  cpu:"",
  netin:"",
  netout:"",
  mem:""
})

const nodeStore = useNodeStore();
const tokenStore = useTokenStore();
const indicatorStore = useIndicatorStore();

onMounted(() => {
  initInfo();
});

// 初始化信息（非图表）
function initInfo() {
  containerSelectedValue.value = containerOptions.value[0].value;
  timeSelectedValue.value = timeOptions.value[0].value;
  curretTime.value = new Date().toISOString().slice(0, 16).replace("T", " ");
  let containerList = nodeStore.containerList;
  totalInfo.totalNum = containerList.length;
  totalInfo.runNum = containerList.filter(
    (item) => item.status == "running"
  ).length;
  let byteSum = 0;
  let cpuUsedNum = 0;
  containerList.forEach((item) => {
    byteSum = byteSum + item.mem;
    cpuUsedNum = cpuUsedNum + item.cpu;
  });
  totalInfo.storeCurrent = (byteSum / (1024 * 1024)).toFixed(2);
  totalInfo.cpuUsed = (cpuUsedNum * 100).toFixed(2);

  containerList.forEach((item) => {
    containerOptions.value.push({ value: item.vmid, label: item.name });
  });
}

// 请求得到指标数据
async function searchIndicator() {
  if (
    containerSelectedValue.value == "none" ||
    timeSelectedValue.value == "none"
  ) {
    ElNotification({
      title: "Error",
      message: "请先选择容器和时间粒度",
      type: "error",
    });
  }
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${containerSelectedValue.value}/rrddata`;
  let data = {
    timeframe: timeSelectedValue.value,
  };
  let responseStatusStart = await axios.get(url, {
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
    params: data,
  });
  indicatorStore.data = responseStatusStart.data.data;
  chartSet(indicatorStore.getCpu,"#f093fb","#f5576c","indicator-container-right-cpu");
  indicatorCurrent.cpu = getDataAvg(indicatorStore.getCpu)*100;
  chartSet(indicatorStore.getNetin,"#a1c4fd","#c2e9fb","indicator-container-right-netin");
  indicatorCurrent.netin = getDataAvg(indicatorStore.getNetin)/1024;
  chartSet(indicatorStore.getNetout,"#667eea","#764ba2","indicator-container-right-netout");
  indicatorCurrent.netout = getDataAvg(indicatorStore.getNetout);
  chartSet(indicatorStore.getMem,"#2af598","#009efd","indicator-container-right-mem");
  indicatorCurrent.mem = getDataAvg(indicatorStore.getMem)/(1024*1024);
}

// chart渲染（工厂模式思想）
// data：x，y数据 startColor，endColor：渐变色， domName：渲染的dom名称 
function chartSet(data, startColor, endColor, domName) {
  let xData = [];
  let yData = [];
  data.forEach(item => {
    xData.push(item.time);
    yData.push(item.value);
  });
  let Chart = echarts.init(
    document.getElementById(domName)
  );
  let options = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xData,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    grid: {
      width: "auto",
      left: 10,
      right: 10,
      height: "auto",
    },
    series: [
      {
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: endColor,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: startColor,
            },
            {
              offset: 1,
              color: endColor,
            },
          ]),
        },
        data: yData,
      },
    ],
  };
  Chart.setOption(options);
}

function getDataAvg(data){
  let sum = 0;
  let count = 0;
  data.forEach(item => {
    sum = sum + item.value;
    count = count + 1;
  });
  return sum/count;
}
</script>
