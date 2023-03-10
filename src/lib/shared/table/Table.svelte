<script lang="ts">
    import TableHeader from "./TableHeader.svelte";
    import TableRow from "./TableRow.svelte";
    import TableCell from "./TableCell.svelte";
    import TableFooter from "./TableFooter.svelte";

    export let columns: any[] = [];
    export let data: any[] = [];
    export let total: number;
</script>

<table>
    {#if $$slots.header}
        <slot name="header" {columns} />
    {:else}
        <TableHeader {columns} />
    {/if}

    <tbody>
        {#each data as row}
            {#if $$slots.row}
                <slot name="row" {row} />
            {:else}
                <TableRow data={row}>
                    {#each Object.values(row) as value}
                        {#if $$slots.cell}
                            <slot name="cell" {value} />
                        {:else}
                            <TableCell>
                                {value}
                            </TableCell>
                        {/if}
                    {/each}
                </TableRow>
            {/if}
        {/each}
    </tbody>

    {#if $$slots.footer}
        <slot name="footer" {total} />
    {:else}
        <TableFooter {total} />
    {/if}
</table>
