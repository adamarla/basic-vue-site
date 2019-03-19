<template>
    <table class="report">
        <tr>
            <td>Total Under Investment</td>
            <td>{{ reportData.plan_id }}</td>
        </tr>
        <tr>
            <td>Horizon (years)</td>
            <td>{{ reportData.plan_status }}</td>
        </tr>
        <tr>
            <td>Upside</td>
            <td>{{ reportData.plan_start }}</td>
        </tr>
        <tr>
            <td>Downside</td>
            <td>{{ reportData.plan_end }}</td>
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
