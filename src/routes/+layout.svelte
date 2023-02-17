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

    let sessionValue = 'false',
        tokenValue              = $token,
        breakPoint              = 1024,
        width,
        backdrop                = false,
        activateClickOutside    = true,
        drawerHidden            = false;

    $: activeUrl = $page.url.pathname;


    if (browser) {
      if(document.cookie.includes('isConnected=true')) {
          sessionValue = 'true';
      }
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
    async function login() {

        let url = env.PUBLIC_SERVER + "/login";
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff'
            },

            body: JSON.stringify(
                {
                    email: "c@g.c",
                    password: "toto"
                }
            )
        })
        if (res.ok) {
            const data = await res.json();
            token.set(data.token)
            session.set("true")
            document.cookie  = 'isConnected=true';
            document.cookie  = 'token=' + data.token;

            sessionValue = 'true';
            goto('/')
        } else {
            sessionValue = 'false';
            alert("Identifiants incorrects")
        }
    }
    async function register() {
        let url = env.PUBLIC_SERVER + "/register";

        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff'

            },
            body: JSON.stringify(
                {
                    "email": "",
                }
            )
        })
        if (res.ok) {

            await otpForm()
        } else {
            alert("Erreur lors de l'inscription")
        }
    }

    // toggle show registration form
    async function otpForm() {
        const form = document.querySelector(".form");
        form.classList.add("hidden");
        const login = document.querySelector(".login");
        login.classList.add("hidden");
        const otp = document.querySelector(".otp");
        otp.classList.remove("hidden");

    }

    async function showForm() {
        const form = document.querySelector(".form");
        form.classList.remove("hidden");
        const login = document.querySelector(".login");
        login.classList.add("hidden");
    }

    async function redirect() {
        session.set("true")
        await goto('/')
    }



</script>

<svelte:window bind:innerWidth={width}/>
<h1>{sessionValue}</h1>
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
    <div class="!bg-black h-screen w-screen flex justify-center items-center absolute mt-0">

        <Card class="!shadow-lg !bg-gray-200 !text-gray-600 login">

            <div class="px-16 py-4"><h1 class="text-2xl font-extrabold text-center ">Service de dépôt</h1></div>
            <Label class="!mt-4  space-y-2">
                <span class="font-extrabold  !text-gray-600">Email</span>
                <Input class="!mb-2 py-2 !w-full border-none !bg-gray-100 !shadow-lg  !text-gray-900" id="email"
                       name="email" placeholder="exemple@toto.fr" required type="email"/>
            </Label>
            <Label class="!mt-4  space-y-2">
                <span class="font-extrabold  !text-gray-600 ">Mot de passe</span>
                <Input class="!mb-2 border-none !bg-gray-100 !shadow-lg py-2 !text-gray-900" id="password" name="password"
                       placeholder="•••••" required type="password"/>
            </Label>
            <Button class="w-full !bg-gray-500 hover:!scale-110" on:click={login} type="submit">Se connecter</Button>
            <p class="mt-6 text-center text-lg font-extrabold">Pas encore inscrit ?</p>
            <Button class="w-full mt-2 !bg-red-800 hover:!scale-110" on:click={showForm}>S'inscrire</Button>
        </Card>

        <Card class="!shadow-lg !bg-gray-200 !text-gray-600 form hidden">
            <div class="px-16 py-2"><h1 class="text-2xl font-extrabold text-center ">Inscription</h1></div>
            <Label class="!mt-4  space-y-2">
                <span class="font-extrabold  !text-gray-500">Nom d'utilisateur</span>
                <Input class="!mb-2 py-2 !w-full !bg-gray-100 border-none !shadow-lg  !text-gray-900" id="regEmail"
                       name="regEmail" placeholder="toto" required type="email"/>
            </Label>
            <Label class="space-y-2">
                <span class="font-extrabold  !text-gray-500">Email</span>
                <Input class="!mb-2 py-2 !w-full !bg-gray-100 !shadow-lg !text-gray-900 border-none" id="email" name="email"
                       placeholder="exemple@toto.fr" required type="email"/>
            </Label>
            <Label class="space-y-2">
                <span class="font-extrabold  !text-gray-400">Téléphone</span>
                <Input class="!mb-2 py-2 !w-full !bg-gray-100 !shadow-lg !text-gray-900 border-none" id="phone" name="phone"
                       placeholder="+3300000000" required type="phone"/>
            </Label>
            <Label class="space-y-2">
                <span class="font-extrabold  !text-gray-500 ">Mot de passe</span>
                <Input class="!mb-2 border-none !bg-gray-100 !text-gray-900 !shadow-lg py-2" id="regPassword"
                       name="regPassword" placeholder="•••••" required type="password"/>
            </Label>
            <Label class="space-y-2">
                <span class="font-extrabold  !text-gray-500 ">Confirmation du mot de passe</span>
                <Input class="!mb-4 border-none !bg-gray-100 !text-gray-900 !shadow-lg py-2" id="confirm" name="confirm"
                       placeholder="•••••" required type="password"/>
            </Label>

            <Button class="w-full mt-2 !bg-red-800 hover:!scale-110" on:click={register}>S'inscrire</Button>

        </Card>

        <Card class="!shadow-lg !bg-gray-200 !text-gray-600 otp hidden">
            <Label class="space-y-2">

                <span class="font-extrabold  !text-gray-500 ">OTP</span>
                <Input class="!mb-4 border-none !bg-gray-100 !text-gray-900 !shadow-lg py-2" id="otp" name="otp"
                       placeholder="1234" required type="text"/>
            </Label>

            <Button class="w-full mt-2 !bg-red-800 hover:!scale-110" on:click={redirect}>Confirmer</Button>

        </Card>

    </div>
{/if}