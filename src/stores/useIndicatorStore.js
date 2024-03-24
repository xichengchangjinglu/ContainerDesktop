import { defineStore } from 'pinia'

export const useIndicatorStore = defineStore('indicatorStore', {
    state:()=>({
        data: []
    }),
    getters:{
        getCpu() {
            let cpu = [];
            this.data.forEach(item => {
                if (item.cpu) {
                    cpu.push({
                        time: this.changeTime(item.time),
                        value: item.cpu 
                    });
                }
            });
            return cpu;
        },
        getNetin() {
            let netin = [];
            this.data.forEach(item => {
                if (item.netin) {
                    netin.push({
                        time: this.changeTime(item.time),
                        value: item.netin
                    });
                }
            });
            return netin;
        },
        getNetout() {
            let netout = [];
            this.data.forEach(item => {
                if (item.netout) {
                    netout.push({
                        time: this.changeTime(item.time),
                        value: item.netout
                    });
                }
            });
            return netout;
        },
        getMem() {
            let mem = [];
            this.data.forEach(item => {
                if (item.netout) {
                    mem.push({
                        time: this.changeTime(item.mem),
                        value: item.mem
                    });
                }
            });
            return mem;
        }
    },
    actions:{
        changeTime(timestamp) {
            const date = new Date(timestamp * 1000);
            const formattedTime = date.toLocaleString();
            return formattedTime;
        }
    }
})