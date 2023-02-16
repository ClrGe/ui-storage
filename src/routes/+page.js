/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

    try {
        const res = await fetch(`http://localhost:3000/transactions/`, {
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