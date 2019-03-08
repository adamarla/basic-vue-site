<template>
  <div id="app">
    <h2>Welcome to IndyFin. Pick a plan</h2>
    <button id="monthly-gold-plan" v-on:click="on_plan_click">Gold Plan</button>
    <button id="monthly-silver-plan" v-on:click="on_plan_click">Silver Plan</button>
    <button id="monthly-bronze-plan" v-on:click="on_plan_click">Bronze Plan</button>
    <div class="center" v-bind:hostingData="hostingData" />
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
      hostingData: null,
      chargebeeInstance: null,
    }
  },
  methods: {
    on_plan_click(event) {
      const plan_id = event.target.id;
      const url = `${AWS_API}?plan_id=${plan_id}`;
      axios.defaults.withCredentials = false;
      this.chargebeeInstance.openCheckout({
        hostedPage: () => {
          return axios.get(url, { headers: { 'Content-Type': 'application/json' } }).then(response => response.data);
        },
        success: function(hostedPageId) {
          console.log(hostedPageId);
          // Hosted page id will be unique token for the checkout that happened
          // You can pass this hosted page id to your backend 
          // and then call our retrieve hosted page api to get subscription details
          // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page              
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
