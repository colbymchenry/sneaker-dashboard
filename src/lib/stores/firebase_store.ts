import {type Writable, writable} from "svelte/store";
import {FirebaseClient, type IFirebaseClient} from "../services/firebase_client";
import {type IAuth, Auth} from "../services/auth";

export const firebaseClient: Writable<IFirebaseClient> = writable<IFirebaseClient>(new FirebaseClient());
// @ts-ignore
export const authClient: Writable<IAuth> = writable<IAuth>(new Auth());