<script lang="ts">
  import "../app.postcss";
  import Navbar from "$lib/shared/Navbar.svelte";
  import AddLocationDrawer from "$lib/drawers/AddLocationDrawer.svelte";
  import { modalStore } from "$lib/stores/modal_store";
</script>

<Navbar />

<div class="pl-20 p-10 w-full relative">
  <slot />
</div>

<AddLocationDrawer />

{#if $modalStore.length}
  <svelte:component
    this={$modalStore[0].component}
    {...$modalStore[0].props || {}}
  />
{/if}
