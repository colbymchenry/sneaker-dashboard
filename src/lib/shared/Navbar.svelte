<script>
    import { slide } from 'svelte/transition';
    import {authClient} from "$lib/stores/firebase_store";

    const navItems = [
        {
            icon: 'home',
            path: '/',
            name: 'Home',
        },
        {
            icon: 'home',
            path: '/analytics',
            name: 'Analytics',
        },
        {
            icon: 'home',
            path: '/profile',
            name: 'Profile',
        },
    ];

    let open = false;

    function toggleNav() {
        open = !open;
    }

    async function handleSignOut() {
        await $authClient.signOut();
    }
</script>

<button on:click|preventDefault|stopPropagation={toggleNav}>Toggle Nav</button>

<div class="navbar" class:navbar--open={open} class:navbar--closed={!open} transition:slide>
    <div class="navbar-header">
        <h3>Sneaker Dashboard</h3>
        <button type="button" class="navbar-toggle" on:click|preventDefault|stopPropagation={toggleNav}>
            <span class="material-symbols-outlined">close</span>
        </button>
    </div>

    <div class="navbar-list">
        {#each navItems as navItem}
            <a href={navItem.path} class="nav-item">
                <span class="material-symbols-outlined">{navItem.icon}</span>
                <span>{navItem.name}</span>
            </a>
        {/each}
    </div>

    <div class="signout-button" on:click={handleSignOut}>
        <span>Sign Out</span>
    </div>
</div>


<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 300px;
        background-color: #1a1a1d;
        color: #ffffff;
        overflow-y: auto;
        transition: transform 0.2s ease-in-out;
        z-index: 1;
    }

    .navbar--open {
        transform: translateX(0);
    }

    .navbar--closed {
        transform: translateX(-100%);
    }

    .navbar-header {
        @apply flex items-center justify-between;
        padding: 1rem;
        background-color: #252528;
    }

    .navbar-toggle {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: #555;
    }

    .navbar-toggle:hover {
        color: #6c6c6c;
    }

    .navbar-list {
        overflow-y: auto;
        height: calc(100% - 80px);
    }

    .nav-item {
        display: flex;
        align-items: center;
        padding: 12px;
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;
    }

    .nav-item:hover {
        background-color: #34353a;
    }

    .nav-item > span:first-of-type {
        margin-right: 8px;
    }

    .nav-item a {
        color: inherit;
        text-decoration: none;
        font-size: 16px;
    }

    .signout-button {
        @apply absolute bottom-0 left-0 w-full bg-red-500 bg-opacity-30 text-white text-center cursor-pointer;
        padding: 1rem;
        transition: background-color 0.2s ease-in-out;
    }

    .signout-button:hover {
        @apply bg-opacity-80;
    }
</style>