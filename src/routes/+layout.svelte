<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import Header from "$lib/Header.svelte";
    import Drawer from "$lib/Drawer.svelte";
    import {Button, Card, Input, Label} from "flowbite-svelte";
    import {env} from "$env/dynamic/public";
    import {goto} from "$app/navigation";
    import {session, token} from "../stores/stores";
    import {browser} from "$app/environment";
    import Login from "$lib/Login.svelte";

    let sessionValue = 'false',
        tokenValue              = $token,
        breakPoint              = 1024,
        width,
        email,
        password,
        backdrop                = false,
        activateClickOutside    = true,
        drawerHidden            = false;


    $: activeUrl = $page.url.pathname;
    if(browser) {
        if (document.cookie.includes("token")) {
            sessionValue = 'true';
        }
        email = document.getElementById("#email")?.valueOf();
        password = document.getElementById("#password")?.valueOf();
    }


    token.subscribe(value => {
        tokenValue = value;
    });

    //
    $: if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
    } else {
        drawerHidden = true;
        activateClickOutside = true;
    }

    onMount(() => {
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    });

</script>

<svelte:window bind:innerWidth={width}/>
{#if sessionValue ===  'true'}
    <Header/>

    <div class="h-4 m-0 w-full border-2 bg-gray-100 !shadow-lg shadow-inner">
    <Drawer />
    <div class="flex !shadow-lg px-4 h-screen w-screen bg-gray-300 ">
        <main class=" w-4/4  ml-auto mr-auto">
            <slot/>
        </main>
    </div>
    </div>

{:else}
    <Login/>
{/if}