import { GoogleAPI, type IGoogleAPI } from "$lib/services/google";
import { writable, type Writable } from "svelte/store";

export const googleApiKey = "AIzaSyBmoM2S5uCZve7XvVWnlvhWMH9IPjRhtfM";

export const googleStore: Writable<IGoogleAPI> = writable<IGoogleAPI>(typeof window !== 'undefined' ? new GoogleAPI(googleApiKey) : undefined);

export const googleHomeMap = writable(undefined);