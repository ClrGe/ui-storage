import {env} from "$env/dynamic/public";

/** @type {import('../../../.svelte-kit/types/src/routes').PageLoad} */
export async function load({ fetch }) {

    try {
        const res = await fetch(env.PUBLIC_SERVER+`/transactions/`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const transactions = await res.json();
        return { transactions };
    } catch (e) {
        console.log(e);

    }
}