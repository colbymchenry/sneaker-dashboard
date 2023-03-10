<script lang="ts">
    export let data: any = {};
</script>

<tr>
    {#each Object.values(data) as value}
        <td>{value}</td>
    {/each}
</tr>
