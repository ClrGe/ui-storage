<script>
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import {env} from "$env/dynamic/public";

    /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
async function getTransactions() {
        async function load({ fetch }) {
            try {
                const res = await fetch(env.PUBLIC_SERVER + `/transactions/`, {
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
}
let transactions = getTransactions();
</script>

<div>
    <h1 class="font-extrabold p-6 text-3xl">Historique des transactions</h1>

    <Table striped={true} bordered={true} hover={true} data={transactions} >
        <TableHead>
            <TableHeadCell>Reference</TableHeadCell>
            <TableHeadCell>Hash</TableHeadCell>
            <TableHeadCell>Lien</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">

        {#each transactions as transaction}
            <TableBodyRow>
                <TableBodyCell>{transaction.name}</TableBodyCell>
                <TableBodyCell>{transaction.hash}</TableBodyCell>
                <TableBodyCell><a>{transaction.address}</a></TableBodyCell>
                <TableBodyCell>{transaction.date}</TableBodyCell>
            </TableBodyRow>
        {/each}
        </TableBody>
    </Table>
</div>