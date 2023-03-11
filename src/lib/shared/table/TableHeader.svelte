<script lang="ts">
    export let columns: any[] = [];
</script>

<thead>
    <tr>
        {#each columns as column}
            <th class="py-2 px-4 text-left">{column.title || column}</th>
        {/each}
    </tr>
</thead>

<style lang="scss">
    thead {
        background-color: #f7fafc;
        border-bottom: 2px solid #cbd5e0;
    }
</style>
