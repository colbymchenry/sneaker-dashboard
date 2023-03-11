<script lang="ts">
    export let total: number;
</script>

<tfoot>
    <tr>
        <td colspan="2" class="font-bold">Total:</td>
        <td class="font-bold">{total}</td>
    </tr>
</tfoot>

<style lang="scss">
    tfoot {
        td {
            @apply px-4;
        }
        border-top: 2px solid #cbd5e0;
        background-color: #f7fafc;
    }
</style>
