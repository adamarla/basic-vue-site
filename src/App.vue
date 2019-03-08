<template>
  <div id="app">
    <h2>Welcome to IndyFin. Pick a plan</h2>
    <button id="monthly-gold-plan" v-on:click="on_plan_click">Gold Plan</button>
    <button id="monthly-silver-plan" v-on:click="on_plan_click">Silver Plan</button>
    <button id="monthly-bronze-plan" v-on:click="on_plan_click">Bronze Plan</button>
    <h3>{{ subscriptionMessage }}</h3>
  </div>
</template>

<script>
import axios from 'axios';
import chargebee from './chargebee.js';
import RiskReport from './RiskReport';

const AWS_API = "https://n9zoyzpsbd.execute-api.us-east-2.amazonaws.com/dev01/getRiskReport"
const CUSTOMER_ID = "indyfin-test"

export default {
  name: 'app',
  components: {
    'risk-report': RiskReport,
  },
  mounted() {
    this.chargebeeInstance = Chargebee.init({
      site: "indyfin-test"
    });
    console.log(this.chargebeeInstance);
  },
  data () {
    return {
      subscriptionMessage: null,
      chargebeeInstance: null,
    }
  },
  methods: {
    on_plan_click(event) {
      const planId = event.target.id;
      let url = `${AWS_API}?plan_id=${planId}`;
      axios.defaults.withCredentials = false;
      this.chargebeeInstance.openCheckout({
        hostedPage: () => {
          return axios.get(url, { headers: { 'Content-Type': 'application/json' } }).then(response => response.data);
        },
        success: (hostedPageId) => {
          console.log(hostedPageId);
          url = `${AWS_API}?hosted_page_id=${hostedPageId}`;
          axios.get(url, { headers: { 'Content-Type': 'application/json' } }).then(response => {
            // TODO: replace this with some visual on the top right of screen that indicates
            // the subscription plan (Gold, Silver, Bronze) and time period (Monthly what date to what date)
            console.log(response.data);
            this.subscriptionMessage = `Congratulations! Your subscription ${response.data["subscriptionId"]} has started!`;
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.center {
  display: inline-block;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
