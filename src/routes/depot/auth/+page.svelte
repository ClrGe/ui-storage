<script>
    import {goto} from "$app/navigation";
    import {Button, Label, Input, Card} from "flowbite-svelte";

    async function register() {
        let url =  "http://localhost:3000/register"

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
            goto('/')
        } else {
            alert("Identifiants incorrects")
        }
    }
</script>

<div class=" flex flex-col items-center justify-center w-full h-full">

    <Card class="!shadow-lg !bg-gray-200 !text-gray-600">
        <div class="px-16 py-4"><h1 class="text-2xl font-extrabold text-center ">S'inscrire</h1></div>
        <Label class="!mt-4  space-y-2">
            <span class="font-extrabold  !text-gray-400">Email</span>
            <Input class="!mb-2 py-2 !w-full !bg-gray-100 !shadow-lg  " id="email" name="email" placeholder="exemple@toto.fr" required type="email"/>
        </Label>
        <Label class="!mt-4  space-y-2">
            <span class="font-extrabold  !text-gray-400">Email</span>
            <Input class="!mb-2 py-2 !w-full !bg-gray-100 !shadow-lg  " id="email" name="email" placeholder="exemple@toto.fr" required type="email"/>
        </Label>
        <Label class="!mt-4  space-y-2">
            <span class="font-extrabold  !text-gray-400 ">Mot de passe</span>
            <Input id="password" class="!mb-2 !bg-gray-100 !shadow-lg py-2" name="password" placeholder="•••••" required type="password"/>
        </Label>
        <Button class="w-full !bg-gray-900 hover:!bg-gray-300 hover:!text-black"  type="submit" on:click={register} >S'inscrire</Button>
    </Card>
</div>