<script lang="ts">
    export let columns: string[] = [];
</script>

<thead>
    <tr>
        {#each columns as column}
            <th>{column}</th>
        {/each}
    </tr>
</thead>
