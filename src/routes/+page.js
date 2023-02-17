import { browser } from "$app/environment";
import {env} from "$env/dynamic/public";
import {get} from "svelte/store";
import {session} from "../stores/stores.js"

/** @type {import('./$types').PageLoad} */
export async function load({fetch })  {
    let token;
    if(browser){
        token = document.cookie.includes('token').valueOf() ;


    try {
        const res = await fetch(env.PUBLIC_SERVER +`/transactions/`, {
            headers: {
                "Content-Type": "application/json",
                    "Authorization": "Bearer " + document.cookie.split('=')[1]
            }
        });
        console.log(token)
        const transactions = await res.json();


        return { transactions };
    } catch (e) {
        console.log(e);

    }
    }
}