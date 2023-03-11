<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let options: any;

    let focused: boolean = false;
    let selectedValue = "";
    let searchString = "";
    let container;

    function selectValue(value: any) {
        selectedValue = value;
        console.log(selectedValue)
        focused = false;
        dispatch("select", value);
    }

    function searchInput(event: any) {
        searchString = event.target.value.toLowerCase();
    }
</script>

<svelte:window on:click={(e) => {
    if (focused) {
        if (!container.contains(e.target)) {
            focused = false;
        }
    }
}} />

<div bind:this={container} class="relative">
    <input
        type="text"
        class="border rounded p-1 pl-4 pr-12 w-full"
        placeholder={selectedValue || "Search..."}
        on:input={searchInput}
        on:focus={() => (focused = true)}
    />
    <span
        class="absolute right-0 top-0 mt-1 h-full w-12 flex items-center justify-center"
    >
        <span class="material-icons  fill-current text-gray-400">search</span>
    </span>
    <div
        class="absolute z-10 bg-white w-full shadow-lg rounded mt-1 options"
        class:hidden={!focused}
    >
        {#each Object.keys(options) as key}
            {#if options[key].filter((value) => value
                    .toLowerCase()
                    .includes(searchString)).length > 0}
                <div>
                    <div class="bg-gray-200 p-1 pl-4">{key}</div>
                    {#each options[key] as value}
                        {#if value.toLowerCase().includes(searchString)}
                            <button
                                type="button"
                                class="p-1 pl-4 cursor-pointer hover:bg-gray-200"
                                on:click={() => selectValue(value)}
                            >
                                {value}
                            </button>
                        {/if}
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    input {
        @apply border border-border rounded-md px-4 py-2 w-full focus:outline-blue-300 focus:outline-2;
    }

    .options {
        max-height: 40vh;
        overflow-y: auto;
    }
</style>
