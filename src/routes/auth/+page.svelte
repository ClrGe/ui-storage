<script>
    import {session} from "../../stores/stores.ts";

    import {env} from "$env/dynamic/public";
   import {goto} from "$app/navigation";
    let sessionValue;
    session.subscribe(value => {
        sessionValue = value;
    });
   async function login() {
       let url =  "http://localhost:3000/login"
       const res = await fetch(url, {
           credentials: 'include',
           method: 'post',
           headers: {
               'Content-Type': 'application/json'
           },

           body: JSON.stringify(
               {
                   email: document.querySelector("input[name='email']").value,
                   password: document.querySelector("input[name='password']").value
               }
           )
       })
       if (res.ok) {
           session.set("true")
           goto('/')
       } else {
           alert("Identifiants incorrects")
       }
   }
</script>

<div>
    <h1>Connexion</h1>
    <form>
        <label for="email">Email</label>
        <input type="email" name="email" id="email">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password">
        <button type="button" on:click={login}>Se connecter</button>
    </form>
</div>