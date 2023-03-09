<script>
    import {FormContext} from "$lib/shared/FormContext.js";
    import {getContext} from "svelte";

    export let type = 'text';
    export let label = '';
    export let placeholder = '';
    export let value = '';
    export let error = '';
    export let disabled = false;
    export let required = false;
    export let name = '';

    let form = getContext(FormContext.key);

    form.subscribe(({values, errors}) => {
        error = errors[name];
    });

    $: classes = ` ${error ? 'border-error' : 'border-border'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}`;

    function setType(node) {
        node.type = type;
    }

</script>

<div class="flex flex-col">
    {#if label}
        <label class="text-sm font-medium text-text mb-1">{label}{required ? ' *' : ''}</label>
    {/if}
    <input use:setType class={classes} {placeholder} bind:value {disabled} {name} on:input on:change on:focus on:blur/>
    {#if error}
        <span class="text-xs font-medium text-error mt-1">{error}</span>
    {/if}
</div>

<style lang="scss">
    input {
      @apply border border-border rounded-md px-4 py-2 mt-2 w-full focus:outline-blue-300 focus:outline-2;
    }
</style>

