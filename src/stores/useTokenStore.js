import { defineStore } from 'pinia'

export const useTokenStore = defineStore('tokenStore', {
    state: () => ({
        username: 'testenduser@pve',
        password: 'd-c.t_pve',
        ticket: '',
        CSRFPreventionToken: ''
    }),
    actions: {
        setTicket(newTicket) {
            this.ticket = newTicket;
        },
        getTicket() {
            return this.ticket;
        },
        clearTicket() {
            this.ticket = '';
        },
        setToken(newToken) {
            this.CSRFPreventionToken = newToken;
        },
        getToken() {
            return this.CSRFPreventionToken;
        },
        clearToken() {
            this.CSRFPreventionToken = '';
        }
    },
})