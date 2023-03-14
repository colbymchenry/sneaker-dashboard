import type { SvelteComponent } from "svelte";
import { writable, type Writable } from "svelte/store";

export interface IModalStoreObject {
    component: any;
    props?: object;
}

export const modalStore: Writable<IModalStoreObject[]> = writable([]);