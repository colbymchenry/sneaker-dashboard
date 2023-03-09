import {type Writable, writable} from 'svelte/store';
import { getAuth, onAuthStateChanged, type UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {browser} from "$app/environment";

export interface User {
    uid: string;
    email: string;
    displayName: string | null;
    photoURL: string | null;
}

const USER_KEY = 'user';

export class Auth {
    auth: ReturnType<typeof getAuth>;
    user: ReturnType<typeof writable>;

    constructor() {
        this.auth = getAuth();
        this.user = writable(null);
        this.init();
    }

    async init() {
        // Check if the user is already logged in
        if (browser) {
            const userJson = localStorage.getItem(USER_KEY);
            if (userJson) {
                const user = JSON.parse(userJson) as User;
                this.setUser(user);
            }
        }

        // Listen for authentication state changes
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                if (email) {
                    this.setUser({uid, email, displayName, photoURL});
                }
            } else {
                this.setUser(null);
            }
        });
    }

    async signIn(email: string, password: string): Promise<UserCredential> {
        try {
            const { user } = await signInWithEmailAndPassword(this.auth, email, password);
            const { uid, email: userEmail, displayName, photoURL } = user;
            if (userEmail) {
                this.setUser({uid, email: userEmail, displayName, photoURL});
                if (browser) {
                    localStorage.setItem(USER_KEY, JSON.stringify({uid, email: userEmail, displayName, photoURL}));
                }
            }
            return {
                operationType: "signIn", providerId: null, user
            };
        } catch (error) {
            throw error;
        }
    }

    async signUp(email: string, password: string): Promise<UserCredential> {
        try {
            const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
            const { uid, email: userEmail } = user;
            if (userEmail) {
                this.setUser({uid, email: userEmail, displayName: null, photoURL: null});
                if (browser) {
                    localStorage.setItem(USER_KEY, JSON.stringify({
                        uid,
                        email: userEmail,
                        displayName: null,
                        photoURL: null
                    }));
                }
            }
            return {
                operationType: "signIn", providerId: null, user
            };
        } catch (error) {
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            await signOut(this.auth);
            this.setUser(null);
            if (browser) {
                localStorage.removeItem(USER_KEY);
            }
        } catch (error) {
            throw error;
        }
    }

    setUser(user: User | null) {
        this.user.set(user);
    }
}

export interface IAuth {
    user: Writable<User | null>;
    init(): Promise<void>;
    signIn(email: string, password: string): Promise<UserCredential>;
    signUp(email: string, password: string): Promise<UserCredential>;
    signOut(): Promise<void>;
    setUser(user: User | null): void;
}
