<style global>
    @import '../../node_modules/filepond/dist/filepond.css';
    @import '../../node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>

<script>
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";

    /** @type {import('../../../.svelte-kit/types/src/routes').PageData} */
    import FilePond, { registerPlugin } from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import {env} from '$env/dynamic/public';

    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import {Button, Checkbox, Chevron, Dropdown, DropdownDivider, DropdownItem, Helper} from "flowbite-svelte";
    import {get} from "svelte/store";
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

</script>

<div class="app container flex flex-col">

        <Button class="mt-16 !bg-gray-900"><Chevron>Options</Chevron></Button>
        <Dropdown class="w-60 p-3 space-y-1 text-sm">
            <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Checkbox checked>IPFS</Checkbox>
                <Helper class="pl-6">Partager ce(s) fichier(s) sur le web décentralisé.</Helper>
            </li>
            <DropdownDivider/>
            <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Checkbox >Filesystem</Checkbox>
                <Helper class="pl-6">Sauvegarder ce(s) fichier(s) dans le système de fichiers distant.</Helper>
            </li>
            <DropdownDivider/>
            <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Checkbox>AWS S3</Checkbox>
                <Helper class="pl-6">Envoyer ce(s) fichier(s) vers un bucket S3.</Helper>
            </li>
        </Dropdown>

    <FilePond class="mt-6" bind:this={pond} {name}
              server= {env.PUBLIC_SERVER + "/upload"}
              allowMultiple={true}
              oninit={handleInit}
              onaddfile={handleAddFile}
              onprocess={handleServerProcessFile}
              labelIdle='Glissez-déposez vos fichiers ou <span class="filepond--label-action">cliquez ici</span>'
    />


    <Table striped={true} bordered={true} hover={true}>
        <TableHead class="!border-gray-800 border-2 bg-gray-200 !text-gray-600">
            <TableHeadCell class="border-gray-800  border-2">Reference</TableHeadCell>
            <TableHeadCell class="border-gray-800 border-2">Hash</TableHeadCell>
            <TableHeadCell class=" border-gray-800 border-2">Lien</TableHeadCell>
            <TableHeadCell class="border-gray-800 border-2">Date</TableHeadCell>
        </TableHead>
        <TableBody class=" divide-y">

            {#each transactions as transaction}
                <TableBodyRow >
                    <TableBodyCell class="border">{transaction.name}</TableBodyCell>
                    <TableBodyCell class="border">{transaction.hash}</TableBodyCell>
                    <TableBodyCell class="border"><a>{transaction.address}</a></TableBodyCell>
                    <TableBodyCell class="border">{transaction.date}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>

