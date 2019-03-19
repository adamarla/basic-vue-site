<template>
  <div id="app">
    <h2>Welcome to Your IndyFin Risk Report</h2>
    <risk-report v-if="reportData" class="center" v-bind:reportData="reportData" />
  </div>
</template>

<script>
import axios from 'axios';
import RiskReport from './RiskReport';

const AWS_API = "https://byjojbiai8.execute-api.us-east-2.amazonaws.com/default/riskReport";

export default {
  name: 'app',
  components: {
    'risk-report': RiskReport,
  },
  data () {
    return {
      reportData: null,
    }
  },
  mounted() {
    axios.defaults.withCredentials = false;
    axios.get(AWS_API, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => (this.reportData = response.data));
  },
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
