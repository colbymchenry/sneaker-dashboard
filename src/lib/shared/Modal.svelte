<!-- Modal.svelte -->
<script lang="ts">
    import { modalStore } from "$lib/stores/modal_store";
    import { onDestroy } from "svelte";
    import Button from "./Button.svelte";

    export let isOpen = false;
    export let onSubmit: (() => any) | undefined = undefined;

    let loading: boolean = false;

    function closeModal() {
        isOpen = false;

        $modalStore.pop();
        $modalStore = $modalStore;
    }

    function cancel() {
        closeModal();
    }

    async function submit() {
        if (onSubmit) {
            await onSubmit();
        }
        closeModal();
    }

</script>

<div class="fixed z-10 inset-0 cc-container" class:isOpen>
    <div class="flex items-center justify-center min-h-screen">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="fixed inset-0 transition-opacity"
            style="background-color: rgba(0, 0, 0, 0.5);"
            on:click|self={closeModal}
        />
        <div
            class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full cc-main max-w-[90vw]"
        >
            <header
                class="px-6 py-4 bg-gray-200 flex items-center justify-between"
            >
                <h2 class="text-lg font-semibold">
                    <slot name="header">Modal Header</slot>
                </h2>
                <button
                    class="rounded-full w-8 h-8 flex items-center justify-center text-red-500 hover:text-white bg-red-300 hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:bg-red-600"
                    on:click={closeModal}
                >
                    <span class="material-icons" style="font-size: 1.5rem;"
                        >close</span
                    >
                </button>
            </header>
            <main class="px-6 py-4 overflow-y-auto max-h-[80vh]">
                {#if isOpen}
                    <slot>This is the modal content.</slot>
                {/if}
            </main>
            <footer class="px-6 py-4 bg-gray-200 flex justify-between">
                <Button
                    className="px-4 py-2 bg-white rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue"
                    on:click={cancel}>Cancel</Button
                >
                <Button
                    className="px-4 py-2 !bg-blue-500 rounded-md text-white hover:!bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    on:click={submit}
                    {loading}>Submit</Button
                >
            </footer>
        </div>
    </div>
</div>

<style lang="scss">
    @keyframes modalFadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20%);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .cc-container {
        @apply pointer-events-none opacity-0;
        transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        z-index: 1000;

        .cc-main {
            opacity: 0;
            transform: translateY(20%);
        }

        &.isOpen {
            @apply pointer-events-auto opacity-100;

            .cc-main {
                animation: modalFadeInUp 0.3s
                    cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
            }
        }
    }
</style>
