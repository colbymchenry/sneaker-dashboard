<script lang="ts">
    import Button from "$lib/shared/Button.svelte";
    import Form from "$lib/shared/Form.svelte";
    import Input from "$lib/shared/Input.svelte";
    import Masonry from "$lib/shared/Masonry.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import { googleStore } from "$lib/stores/google_store";
    import { onMount } from "svelte";

    export let isOpen: boolean = false;
    export let store: any;

    console.log(store);

    let form: any;
    let storeDetails: any;
    let storePhotos: string[];
    let imageGrid;

    async function onSubmit(formData: any) {}

    onMount(async () => {
        try {
            storeDetails = await $googleStore.getStoreDetails(store.place_id);
        } catch (error) {
            console.error(error);
            alert("Error getting store details from Google API.");
        }

        try {
            storePhotos = await $googleStore.getStorePhotos(store.place_id);
        } catch (error) {
            console.error(error);
            alert("Error getting store photos from Google API.");
        }
    });
</script>

<Modal bind:isOpen>
    <span slot="header">Add Store</span>

    <Form
        bind:form
        className="bg-white rounded-md p-8 grid max-w-full"
        style="grid-template-columns: 0.5fr 1fr;"
        {onSubmit}
        let:handleInput
    >
        <div class="flex flex-col">
            <div class="mb-6">
                <Input
                    name="name"
                    type="text"
                    label="Business Name"
                    value={store?.name}
                    on:input={handleInput}
                />
            </div>
            <div class="mb-4">
                <Input
                    name="website"
                    type="text"
                    label="Website"
                    placeholder="stockx.com"
                    value={storeDetails?.website}
                    on:input={handleInput}
                />
            </div>
            <div class="mb-4">
                <Input
                    name="instagram"
                    type="text"
                    label="Instagram"
                    placeholder="@account"
                    on:input={handleInput}
                />
            </div>
            <div class="mb-4">
                <Input
                    name="facebook"
                    type="text"
                    label="Facebook"
                    placeholder="@account"
                    on:input={handleInput}
                />
            </div>
            <div class="mb-4 flex flex-col">
                <span class="font-bold mb-3">Store Hours:</span>
                {#each storeDetails?.opening_hours.weekday_text || [] as line}
                    <span>{line}</span>
                {/each}
            </div>
        </div>

        <div class="flex flex-col overflow-hidden">
            <span class="font-bold mb-3">Gallery:</span>
            <div class="overflow-auto max-h-[600px]">
                <Masonry
                    stretchFirst={true}
                    gridGap={"0.75rem"}
                    colWidth={"minmax(Min(20em, 100%), 1fr)"}
                    items={storePhotos || []}
                >
                    {#each storePhotos || [] as src}
                        <img {src} loading="lazy" alt="img" />
                    {/each}
                </Masonry>
            </div>
        </div>
    </Form>
</Modal>
