<script lang="ts">
    import { onMount } from "svelte";

    export let isOpen = false;
    export let title: string = "Drawer Title";

    const closeDrawer = () => {
        isOpen = false;
    };

    const drawerContentStyle = `
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      min-width: 300px;
      max-width: 80vw;
      width: max-content;
      background-color: white;
      z-index: 1000;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease-in-out;
      transform: translateX(100%);
      overflow-y: auto;
    `;

    let overlayStyle = "";
    let contentStyle = "";

    const setStyles = () => {
        overlayStyle = isOpen
            ? "opacity: 1; pointer-events: auto;"
            : "opacity: 0; pointer-events: none;";
        contentStyle = isOpen
            ? "transform: translateX(0%);"
            : "transform: translateX(100%);";
    };

    onMount(setStyles);

    $: isOpen, setStyles()
</script>

<div style={overlayStyle} class="drawer-overlay" />

<div style="{drawerContentStyle}{contentStyle}" class="drawer-content">
    <div class="drawer-header">
        <span class="flex items-center">{@html title}</span>
        <button on:click={closeDrawer} class="close-button"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="drawer-body">
        <slot />
    </div>
</div>

<style>
    .drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        font-size: 18px;
        font-weight: bold;
        color: #2d3748;
        background-color: #e2e8f0;
        border-bottom: 1px solid #cbd5e0;
    }

    .close-button {
        cursor: pointer;
    }

    .drawer-overlay {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
    }
</style>
