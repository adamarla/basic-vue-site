<template>
    <table class="report">
        <tr>
            <td>Total Under Investment</td>
            <td>{{ reportData.item.scalingFactor * 100000 | currency }}</td>
        </tr>
        <tr>
            <td>Horizon (years)</td>
            <td>{{ reportData.horizon_years }}</td>
        </tr>
        <tr>
            <td>Upside</td>
            <td>{{ reportData.upside }}</td>
        </tr>
        <tr>
            <td>Downside</td>
            <td>{{ reportData.downside }}</td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'RiskReport',
    props: ['reportData'],
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
