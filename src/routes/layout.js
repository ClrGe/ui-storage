import {env} from "$env/dynamic/public";
import {get} from "svelte/store";
import {session} from "../stores/stores.js"

/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    let sessionValue = get(session);
    session.subscribe(value => {
        sessionValue = value;
    });
    try {

        let url = env.PUBLIC_SERVER + "/login";
        const auth = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff'
            },

            body: JSON.stringify(
                {
                    "email": "c@g.c",
                    "password": "toto"
                }
            )
        })
        if (auth.ok) {
            session.set('true');

            sessionValue = 'true';

        } else {
            session.set('false');
        }


        return {session};

    } catch (e) {
        console.log(e);

    }
}