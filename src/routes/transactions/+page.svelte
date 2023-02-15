<script>
    let files = [];
    async function get() {
        const res = await fetch('http://localhost:3000/files', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const data = await res.json();
            files = data;
            console.log(files);
        } else {
            console.log('error');
        }
    }
    get();
</script>

<div>
    <h1 class="font-extrabold p-6 text-3xl">Historique des transactions</h1>
    <table class="w-full border">
        <tr class="border">
            <th class="border">Référence</th>
            <th class="border">Hash</th>
            <th class="border">Adresse</th>
        </tr>
        {#each files as file}
            <tr class="border">
                <td  class="border">{file.name}</td>
                <td  class="border">{file.hash}</td>
                <td  class="border"><a>{file.address}</a></td>
            </tr>
        {/each}
    </table>
</div>