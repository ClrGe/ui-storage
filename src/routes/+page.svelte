<script>
    import {Button} from "flowbite-svelte";
    import {goto} from "$app/navigation";
    function redirect(path){
        goto(path);
    }
</script>

<div class="h-screen">
    <h1>Dépôt de fichiers</h1>
   <Button on:click={goto("/ipfs")}>Déposer un fichier</Button>
    <Button on:click={goto("/about")}>À propos de ce service</Button>
    <Button on:click={goto("/ipfs")}>Mon compte</Button>
    <Button on:click={goto("/ipfs")}>Paramètres</Button>
</div>

