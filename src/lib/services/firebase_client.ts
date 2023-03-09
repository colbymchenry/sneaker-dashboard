import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';

interface DocumentData {
    [key: string]: any;
}

export class FirebaseClient {
    db: ReturnType<typeof getFirestore>;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBVt3omFymErl7x-BcxXzhGLsygnqfu3KY",
            authDomain: "flutter-tutorial-efa7e.firebaseapp.com",
            projectId: "flutter-tutorial-efa7e",
            storageBucket: "flutter-tutorial-efa7e.appspot.com",
            messagingSenderId: "679709956448",
            appId: "1:679709956448:web:ecb5891acc773704f1e605",
            measurementId: "G-57660JPR7J"
        };
        initializeApp(firebaseConfig);
        this.db = getFirestore();
    }

    async getDocument<T extends DocumentData>(collectionName: string, id: string): Promise<T> {
        const docRef = doc(this.db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {...docSnap.data(), id} as unknown as T;
        } else {
            throw new Error(`Document ${id} does not exist in collection ${collectionName}`);
        }
    }

    async getDocuments<T extends DocumentData>(collectionName: string): Promise<T[]> {
        const querySnapshot = await getDocs(collection(this.db, collectionName));
        const documents = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id} as unknown as T));
        return documents;
    }

    async addDocument<T extends DocumentData>(collectionName: string, data: T): Promise<string> {
        const docRef = await addDoc(collection(this.db, collectionName), data);
        return docRef.id;
    }

    async updateDocument<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        // @ts-ignore
        await updateDoc(docRef, data);
    }

    async setDocument<T extends DocumentData>(collectionName: string, id: string, data: T): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await setDoc(docRef, data);
    }

    async deleteDocument(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.db, collectionName, id);
        await deleteDoc(docRef);
    }
}


export interface IFirebaseClient {
    getDocument<T extends DocumentData>(collectionName: string, id: string): Promise<T>;
    getDocuments<T extends DocumentData>(collectionName: string): Promise<T[]>;
    addDocument<T extends DocumentData>(collectionName: string, data: T): Promise<string>;
    updateDocument<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void>;
    setDocument<T extends DocumentData>(collectionName: string, id: string, data: T): Promise<void>;
    deleteDocument(collectionName: string, id: string): Promise<void>;
}