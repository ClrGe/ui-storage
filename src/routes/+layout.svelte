<script lang="ts">
    import '../app.postcss';
    import {session} from "../stores/stores.ts";
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import {
        Button,
        Chevron,
        CloseButton,
        Drawer,
        Dropdown,
        DropdownDivider,
        DropdownItem,
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper
    } from 'flowbite-svelte';
    import {Cog, User} from 'svelte-heros-v2';
    import Login from "$lib/Login.svelte";
    import {sineIn} from 'svelte/easing';

    let hidden2 = true;
    let spanClass = 'flex-1 ml-3 whitespace-nowrap';
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };

    let breakPoint: number = 1024;
    let width: number;
    let backdrop: boolean = false;
    let activateClickOutside = true;
    let drawerHidden: boolean = false;

    $: if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
    } else {
        drawerHidden = true;
        activateClickOutside = true;
    }

    onMount(() => {
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    });

    $: activeUrl = $page.url.pathname;
    let divClass = 'w-full md:block md:w-auto pr-8';
    let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';

    let sessionValue;
    session.subscribe(value => {
        sessionValue = value;
    });
</script>

<svelte:window bind:innerWidth={width}/>
{#if sessionValue === "true"}
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
                    <Button class="font-bold !bg-gray-900">Deconnexion</Button>
                </DropdownItem>
            </Dropdown>
        </NavUl>
    </Navbar>

    <div class="h-4 m-0 w-full border-2 bg-gray-100 !shadow-lg shadow-inner"></div>

    <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id='sidebar2'>
        <div class='flex items-center'>
            <h5 id="drawer-navigation-label-3"
                class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
            <CloseButton on:click={() => (hidden2 = true)} class='mb-4 dark:text-white'/>
        </div>
        <Sidebar>
            <SidebarWrapper divClass='overflow-y-auto py-4 px-3 rounded dark:bg-gray-800'>
                <SidebarGroup>
                    <SidebarItem label="Dashboard">
                        <svelte:fragment slot="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/>
                            </svg>
                        </svelte:fragment>
                    </SidebarItem>
                    <DropdownDivider/>
                    <SidebarItem label="Services" {spanClass}>
                        <svelte:fragment slot="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                            </svg>
                        </svelte:fragment>
                        <svelte:fragment slot="subtext">
                        </svelte:fragment>
                    </SidebarItem>
                    <DropdownDivider/>
                    <SidebarItem label="Transactions" {spanClass}>
                        <svelte:fragment slot="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"/>
                            </svg>
                        </svelte:fragment>
                        <svelte:fragment slot="subtext">
                            <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                            <DropdownDivider/>
                        </svelte:fragment>
                    </SidebarItem>
                    <DropdownDivider/>
                    <SidebarItem label="Profil">
                        <svelte:fragment slot="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>
                        </svelte:fragment>
                    </SidebarItem>
                    <DropdownDivider/>
                    <SidebarItem label="Paramètres">
                        <svelte:fragment slot="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"/>
                            </svg>
                        </svelte:fragment>
                    </SidebarItem>
                    <DropdownDivider/>
                    <SidebarItem label="Déconnexion">
                        <svelte:fragment slot="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                            </svg>
                        </svelte:fragment>
                    </SidebarItem>
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </Drawer>
    <div class="flex !shadow-lg px-4 h-screen w-screen bg-gray-300 ">
        <main class=" w-4/4  ml-auto mr-auto">
            <slot/>
        </main>
    </div>
{:else}
    <div class="!bg-black h-screen w-screen flex justify-center items-center absolute mt-0">
        <Login/>

    </div>
{/if}