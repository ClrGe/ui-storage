<style global>
    @import '../../node_modules/filepond/dist/filepond.css';
    @import '../../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>

<script>
    import {
        Button,
        Checkbox,
        Chevron,
        Dropdown,
        DropdownDivider,
        Helper,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from "flowbite-svelte";

    /** @type {import('../../../.svelte-kit/types/src/routes').PageData} */
    import FilePond, {registerPlugin} from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import {env} from '$env/dynamic/public';
    import {token} from '../stores/stores.js'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import {browser} from "$app/environment";
    import {CloudArrowDown} from "svelte-heros-v2";

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
    let pond;
    let name = 'filepond';
    let selected;

    // handle filepond events
    function handleInit() {
        console.log('FilePond has initialised');
    }

    function handleAddFile(err, fileItem) {
        console.log('A file has been added', fileItem);
    }

    function handleServerProcessFile(err, fileItem, status, response) {
        console.log('A file has been processed by the server', fileItem, status, response);
    }

    export let data;
    let transactions = data.transactions;
    let session = data.session;
    let tokenValue = $token;

    async function getTrans() {
        if (browser) {
            tokenValue = document.cookie.includes('token').valueOf();
        }

        try {
            const res = await fetch(`http://localhost:3000/api/transactions/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + tokenValue
                }
            });
            console.log(token)
            const transactions = await res.json();

            return {transactions};
        } catch (e) {
            console.log(e);

        }
    }

</script>


<div class="app  flex flex-col  relative bg-white shadow-lg sm:rounded-lg my-6 ">


    <div class="mt-6  flex flex-row justify-center items-center"><img class="h-24 pr-8 hover:scale-110"
                                                                      src="src/lib/img/ipfs4.png" alt="IPFS"/><img
            class="h-24 pr-8 hover:scale-110" src="src/lib/img/fs.png" alt="FS"/><img class=" pr-8 h-24 hover:scale-110"
                                                                                      src="src/lib/img/s3.png"
                                                                                      alt="S3"/></div>
    <Button class="mt-4 !text-lg w-1/6 !bg-gray-600 ml-auto mr-auto !font-extrabold">
        <Chevron>Options</Chevron>
    </Button>

    <Dropdown class="w-60 p-3 space-y-1 text-sm bg-gray-200">
        <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <Checkbox checked><p class="font-extrabold uppercase text-green-600">IPFS</p></Checkbox>
            <Helper class="pl-6">Partager ce(s) fichier(s) sur le web décentralisé.</Helper>
        </li>
        <DropdownDivider/>
        <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <Checkbox><p class="font-extrabold  text-yellow-600 uppercase ">Filesystem</p></Checkbox>
            <Helper class="pl-6">Sauvegarder ce(s) fichier(s) dans le système de fichiers distant.</Helper>
        </li>
        <DropdownDivider/>
        <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <Checkbox><p class="font-extrabold uppercase text-red-600">AWS S3</p></Checkbox>
            <Helper class="pl-6">Envoyer ce(s) fichier(s) vers un bucket S3.</Helper>
        </li>
    </Dropdown>

    <div class="bg-[#f1f0ef] my-4 border-y border-black ">
        <div class=" flex flex-col justify-center items-center pt-4">
            <CloudArrowDown size="100" color="#74d4d9"/>
        </div>

        <FilePond allowMultiple={true} bind:this={pond} class=""
                  labelIdle='<b>Glissez-déposez vos fichiers ou <span class="filepond--label-action" style="color:#74d4d9;" >cliquez ici</span></b>'
                  {name}
                  onaddfile={handleAddFile}
                  oninit={handleInit}
                  onprocess={handleServerProcessFile}
                  autoProcess={true}
                  auth={tokenValue}
                  server={env.PUBLIC_SERVER + "/upload"}
        />
    </div>
    <div class="grid grid-cols-8 my-4 ">
        <div></div>
        <div></div>
        <Checkbox class="m-4 mr-auto ml-auto">Rendre public</Checkbox>
        <Checkbox class="m-4 mr-auto ml-auto">Chiffrer</Checkbox>
        <Checkbox class="m-4 mr-auto ml-auto">Générer une signature</Checkbox>
        <Checkbox class="m-4 mr-auto ml-auto">Durée de vie limitée</Checkbox>
        <div></div>
        <div></div>
    </div>
</div>

<div class="relative bg-white shadow-lg sm:rounded-lg mb-6">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table bordered={true} class="!rounded-lg" hover={true} striped={true}>
            <TableHead class="!border-gray-500  bg-gray-600 !text-white">
                <TableHeadCell class="border-gray-500  border-2">Reference</TableHeadCell>
                <TableHeadCell class="border-gray-500 border-2">Hash</TableHeadCell>
                <TableHeadCell class=" border-gray-500 border-2">Lien</TableHeadCell>
                <TableHeadCell class="border-gray-500 border-2">Date</TableHeadCell>
            </TableHead>
            <TableBody class=" divide-y">
                {#each transactions as transaction}
                    <TableBodyRow>
                        <TableBodyCell class="border">{transaction.name}</TableBodyCell>
                        <TableBodyCell class="border">{transaction.hash}</TableBodyCell>
                        <TableBodyCell class="border"><a>{transaction.address}</a></TableBodyCell>
                        <TableBodyCell class="border">{transaction.date}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
</div>