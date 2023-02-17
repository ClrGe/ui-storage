<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import Header from "$lib/components/Header.svelte";
    import Drawer from "$lib/components/Drawer.svelte";
    import {token} from "../stores/stores";
    import {browser} from "$app/environment";
    import Login from "$lib/components/Login.svelte";

    let sessionValue = 'false',
        tokenValue = $token,
        breakPoint = 1024,
        width,
        email,
        password,
        activateClickOutside = true,
        drawerHidden = false;


    $: activeUrl = $page.url.pathname;
    if (browser) {
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

<svelte:window width="auto"/>
{#if sessionValue === 'true'}

    <Header/>

    <Drawer/>
    <div class="flex !shadow-lg px-4 h-screen w-screen bg-gray-200 ">
        <main class=" w-screen  ml-auto mr-auto">
            <slot/>
        </main>
    </div>

{:else}
    <Login/>
{/if}