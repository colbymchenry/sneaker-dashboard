<script lang="ts">
    export let data: any = {};
</script>

<tr>
    {#each Object.values(data) as value}
        <td class="py-2 px-4">{value}</td>
    {/each}
</tr>

<style lang="scss">
    tr:nth-child(odd) {
        background-color: #f7fafc;
    }

    tr:nth-child(even) {
        background-color: #edf2f7;
    }
</style>
