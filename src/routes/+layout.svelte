<script lang="ts">
  import "../app.postcss";
  import Navbar from "$lib/shared/Navbar.svelte";
    import AddLocationDrawer from "$lib/drawers/AddLocationDrawer.svelte";

</script>

<Navbar />

<div class="pl-20 p-10 w-full relative">
  <slot />
</div>

<AddLocationDrawer />