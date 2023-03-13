<script lang="ts">
    import { googleStore } from "$lib/stores/google_store";
    import { onMount } from "svelte";

    export let className: string = "";
    export let style: string = "";

    let map;

    function renderMap(node: HTMLElement) {
        (async () => {
            map = await $googleStore.renderMap(node);
            await $googleStore.filterMap(map);
        })();
    }
</script>

<div use:renderMap class={className} {style} />
