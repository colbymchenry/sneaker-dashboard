<script lang="ts">
    import { GoogleAPI } from "$lib/services/google";
    import Button from "$lib/shared/Button.svelte";
    import Drawer from "$lib/shared/Drawer.svelte";
    import Form from "$lib/shared/Form.svelte";
    import Input from "$lib/shared/Input.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import Select from "$lib/shared/Select.svelte";
    import states from "$lib/shared/states.json";
    import { googleStore } from "$lib/stores/google_store";
    import { tick } from "svelte";
    import AddDetailsModal from "./AddDetailsModal.svelte";
    import Location from "./Location.svelte";

    let form: any;
    let isOpen: boolean = false;
    let showDetailsModal: boolean = false;
    let selectedStore: any;

    let nearbyStores: any[] = [];
    let city: string = "";

    const onSubmit = async (data: any) => {
        nearbyStores = [];
        await tick();
        nearbyStores = await $googleStore.searchStores(data.address, city);

        // Calculate review count ratio for each restaurant
        nearbyStores.forEach((store) => {
            store.review_count_ratio = store.rating * store.user_ratings_total;
        });

        // Sort restaurants based on review count ratio
        nearbyStores.sort((a, b) => {
            return b.review_count_ratio - a.review_count_ratio;
        });
        nearbyStores = nearbyStores;
        console.log(nearbyStores);
    };
</script>

<button
    on:click|preventDefault|stopPropagation={() => (isOpen = true)}
    class="fixed bottom-4 right-4 z-50 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2 flex items-center justify-center shadow-md"
    ><span class="material-symbols-outlined">add</span></button
>

<Drawer bind:isOpen title="Add Location 💎">
    <Form
        bind:form
        className="bg-white rounded-md p-8 "
        {onSubmit}
        let:handleInput
    >
        <div class="flex items-stretch">
            <div class="flex-1">
                <Input
                    type="text"
                    placeholder="Address or business"
                    name="address"
                    on:input={handleInput}
                />
            </div>
            <div class="mx-2">
                <Select
                    on:select={({ detail }) => (city = detail)}
                    options={states}
                />
            </div>
            <button
                type="submit"
                class="border rounded p-1 px-2 text-white bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
            >
                <span class="material-icons  fill-current text-white"
                    >search</span
                >
            </button>
        </div>
    </Form>

    {#each nearbyStores || [] as store, index}
        {#key nearbyStores[index]}
            <Location
                {store}
                on:add={() => {
                    selectedStore = store;
                    showDetailsModal = true;
                }}
            />
        {/key}
    {/each}
</Drawer>

{#if selectedStore && showDetailsModal}
    <AddDetailsModal bind:isOpen={showDetailsModal} store={selectedStore} />
{/if}
