<template>
  <div>
    {{ hostingData }}
  </div>
</template>

<script>
export default {
    name: 'RiskReport',
    props: ['hostingData'],
}
</script>

<style lang="scss" scoped>
    .report {
        table-layout: fixed;
        width: 400px;
        border: 1px;
        border: solid;
    }

    tr :first-child {
        width: 80%;
        text-align: left;
    }

    tr :nth-child(2) {
        text-align: right;
    }
</style>
