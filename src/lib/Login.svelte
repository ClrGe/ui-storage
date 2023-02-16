<script>
    import {session} from "../stores/stores.ts";
    import {goto} from "$app/navigation";
    import {Button, Label, Input, Card, Dropdown, DropdownItem, DropdownDivider, Chevron} from "flowbite-svelte";
    let sessionValue;
    session.subscribe(value => {
        sessionValue = value;
    });

    async function login() {

        let url =  "http://localhost:3000/login"
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(
                {
                    email: document.querySelector("input[name='email']").value,
                    password: document.querySelector("input[name='password']").value
                }
            )        })
        if (res.ok) {
            session.set("true")
            goto('/')
        } else {
            alert("Identifiants incorrects")
        }
    }
    async function register() {
        let url =  "http://localhost:3000/register"

        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: document.querySelector("input[name='regEmail']").value,
                    password: document.querySelector("input[name='regPassword']").value
                }
            )        })
        if (res.ok) {
            session.set("true")

            goto('/')
        } else {
            alert("Erreur lors de l'inscription")
        }
    }

    // toggle show registration form
    async function toggleForm() {
        const form = document.querySelector(".form");
        form.classList.toggle("hidden");

    }
    async function showForm(){
        const form = document.querySelector(".form");
        form.classList.remove("hidden");
        const login = document.querySelector(".login");
        login.classList.add("hidden");
    }
</script>

<div class=" flex flex-col items-center justify-center w-full h-full">

    <Card class="!shadow-lg !bg-gray-200 !text-gray-600 login">
        <div class="px-16 py-4"><h1 class="text-2xl font-extrabold text-center ">Service de dépôt</h1></div>
        <Label class="!mt-4  space-y-2">
            <span class="font-extrabold  !text-gray-600">Email</span>
            <Input class="!mb-2 py-2 !w-full border-none !bg-gray-100 !shadow-lg  !text-gray-900" id="email" name="email" placeholder="exemple@toto.fr" required type="email"/>
        </Label>
        <Label class="!mt-4  space-y-2">
            <span class="font-extrabold  !text-gray-600 ">Mot de passe</span>
            <Input id="password" class="!mb-2 border-none !bg-gray-100 !shadow-lg py-2 !text-gray-900" name="password" placeholder="•••••" required type="password"/>
        </Label>
        <Button class="w-full !bg-gray-500 hover:!scale-110"  type="submit" on:click={register} >Se connecter</Button>
        <p class="mt-6 text-center text-lg font-extrabold">Pas encore inscrit ?</p>
       <Button class="w-full mt-2 !bg-red-800 hover:!scale-110" on:click={showForm}>S'inscrire</Button>
    </Card>

    <Card class="!shadow-lg !bg-gray-200 !text-gray-600 form hidden">
        <div class="px-16 py-2"><h1 class="text-2xl font-extrabold text-center ">Inscription</h1></div>
        <Label class="!mt-4  space-y-2">
            <span class="font-extrabold  !text-gray-500">Nom d'utilisateur</span>
            <Input class="!mb-2 py-2 !w-full !bg-gray-100 border-none !shadow-lg  !text-gray-900" id="regEmail" name="regEmail" placeholder="toto" required type="email"/>
        </Label>
        <Label class="space-y-2">
            <span class="font-extrabold  !text-gray-500">Email</span>
            <Input class="!mb-2 py-2 !w-full !bg-gray-100 !shadow-lg !text-gray-900 border-none" id="email" name="email" placeholder="exemple@toto.fr" required type="email"/>
        </Label>
        <Label class="space-y-2">
            <span class="font-extrabold  !text-gray-400">Téléphone</span>
            <Input class="!mb-2 py-2 !w-full !bg-gray-100 !shadow-lg !text-gray-900 border-none" id="phone" name="phone" placeholder="+3300000000" required type="phone"/>
        </Label>
        <Label class="space-y-2">
            <span class="font-extrabold  !text-gray-500 ">Mot de passe</span>
            <Input id="regPassword" class="!mb-2 border-none !bg-gray-100 !text-gray-900 !shadow-lg py-2" name="regPassword" placeholder="•••••" required type="password"/>
        </Label>
        <Label class="space-y-2">
            <span class="font-extrabold  !text-gray-500 ">Confirmation du mot de passe</span>
            <Input id="confirm" class="!mb-4 border-none !bg-gray-100 !text-gray-900 !shadow-lg py-2" name="confirm" placeholder="•••••" required type="password"/>
        </Label>

        <Button class="w-full mt-2 !bg-red-800 hover:!scale-110" on:click={register}>S'inscrire</Button>

    </Card>
</div>