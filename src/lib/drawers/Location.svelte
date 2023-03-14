<script lang="ts">
    import Button from "$lib/shared/Button.svelte";
    import { googleHomeMap } from "$lib/stores/google_store";
    import { createEventDispatcher, onMount } from "svelte";

    const DEFAULT_IMAGE = "https://via.placeholder.com/150";

    export let store: any;

    const dispatch = createEventDispatcher();

    let images: string[] = [];

    // Retrieve restaurant images from the Google Places API if available
    if (store.photos) {
        images = [store.photos[0].getUrl({ maxWidth: 500 })];
    } else {
        images = [DEFAULT_IMAGE];
    }

    function drawChars(n: number, char: string): string {
        return Array(n).fill(char).join("");
    }

    function drawStars(rating: number): string {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? true : false;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const fullStarHTML = '<span class="material-icons">star</span>';
        const halfStarHTML = '<span class="material-icons">star_half</span>';
        const emptyStarHTML = '<span class="material-icons">star_border</span>';

        return `${Array(fullStars).fill(fullStarHTML).join("")}${
            halfStar ? halfStarHTML : ""
        }${Array(emptyStars).fill(emptyStarHTML).join("")}`;
    }

    function navigateHomeMap() {
        const lat = store.geometry.location.lat();
        const lng = store.geometry.location.lng();

        if ($googleHomeMap) {
            $googleHomeMap.setCenter({ lat: lat, lng: lng });
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="restaurant-info" on:click={navigateHomeMap}>
    <div class="name-and-rating">
        <h2 class="name">{store.name}</h2>
        <div class="rating">
            <span class="stars">{@html drawStars(store.rating)}</span>
            <span class="total-ratings">{store.user_ratings_total} reviews</span
            >
        </div>
    </div>
    <div class="address">
        <span class="formatted-address">{store.formatted_address}</span>
        <div class="flex items-stretch">
            {#if images?.length}
                <img src={images[0]} loading="lazy" alt="img" />
            {/if}
        </div>
    </div>
    <div class="price-level">
        <span class="label">Price Level:</span>
        <span class="level">{drawChars(store.price_level, "$")}</span>
    </div>

    <Button
        className="!bg-blue-500 text-white absolute bottom-4 right-4 flex items-center justify-center shadow-md"
        style="width: 2rem;height: 2rem;padding: 0;border-radius: 100%;"
        on:click={() => dispatch("add")}
    >
        <span class="material-icons">add</span>
    </Button>
</div>

<style lang="scss">
    table {
        @apply whitespace-nowrap text-sm;
    }

    .restaurant-info {
        @apply m-4 relative;
        background-color: #f3f4f6;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    .name-and-rating {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .name {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
    }

    .rating {
        display: flex;
        align-items: center;
    }

    .stars {
        color: #ffc107;
    }

    .total-ratings {
        margin-left: 8px;
    }

    .address {
        @apply grid grid-cols-2 grid-rows-1;
        grid-template-columns: 1fr 0.25fr;
        margin-bottom: 20px;
    }

    .icon {
        font-size: 24px;
        color: white;
        border-radius: 50%;
        margin-right: 8px;
        padding: 8px;
    }

    .formatted-address {
        font-size: 16px;
    }

    .price-level {
        display: flex;
        align-items: center;
    }

    .label {
        font-weight: bold;
        margin-right: 8px;
    }

    .level {
        font-weight: bold;
        color: #4caf50;
    }
</style>
