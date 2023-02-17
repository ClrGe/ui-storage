<script>
    import '../app.postcss';
    import {page} from '$app/stores';
    import {
        Button,
        Chevron,
        Dropdown,
        DropdownDivider,
        DropdownItem,
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
    } from 'flowbite-svelte';
    import {Cog, User} from 'svelte-heros-v2';
    import {goto} from "$app/navigation";
    let hidden2 = true;
    $: activeUrl = $page.url.pathname;
    let divClass = 'w-full md:block md:w-auto pr-8';
    let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';

    async function disconnect() {
        document.cookie  = 'isConnected=false; path=/;';
        await goto('/')
    }

</script>

    <Navbar let:hidden let:toggle>
        <NavHamburger btnClass="ml-3" on:click={() => (hidden2 = false)}/>
        <NavBrand href="." class="lg:ml-16">
            <Cog/>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
            Service de dépôt
          </span>
        </NavBrand>
        <NavHamburger on:click={toggle}/>
        <NavUl {hidden} {divClass} {ulClass}>
            <Button class="!bg-white !rounded-full !list-none font-bold tracking-wider !text-gray-900">
                <Chevron><User/></Chevron>
            </Button>
            <Dropdown>
                <DropdownItem><a href="">Dépôt</a></DropdownItem>
                <DropdownItem><a href="/transactions">Transactions</a></DropdownItem>
                <DropdownItem><a href="/options">Paramètres</a></DropdownItem>
                <DropdownDivider/>
                <DropdownItem>
                    <Button class="font-bold !bg-gray-900" on:click={disconnect}>Deconnexion</Button>
                </DropdownItem>
            </Dropdown>
        </NavUl>
    </Navbar>
