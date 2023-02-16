<script lang="ts">
  import '../app.postcss';
  import {session} from "../stores/stores.ts";

  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    Drawer,
    CloseButton,
    SidebarDropdownWrapper, Button, Chevron, Dropdown, DropdownItem, DropdownDivider
  } from 'flowbite-svelte';
  import {Cog, User} from 'svelte-heros-v2';
  import { sineIn } from 'svelte/easing';
  import Login from "$lib/Login.svelte";
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
  const toggleSide = () => {
    if (width < breakPoint) {
      drawerHidden = !drawerHidden;
    }
  };
  const toggleDrawer = () => {
    drawerHidden = false;
  };
  $: activeUrl = $page.url.pathname;
  let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
  let divClass = 'w-full md:block md:w-auto pr-8';
  let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';

  let sessionValue;
  session.subscribe(value => {
    sessionValue = value;
  });
</script>

<svelte:window bind:innerWidth={width}/>
{#if sessionValue === "true"}
  <Navbar let:hidden let:toggle >
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
    <NavBrand href="/" class="lg:ml-16">
      <Cog />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
        Service de dépôt
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} {divClass} {ulClass}>
    <Button class="!bg-white !rounded-full !list-none font-bold tracking-wider !text-gray-900">
      <Chevron><User/></Chevron>
    </Button>
    <Dropdown>
      <DropdownItem><a href="/">Dépôt</a></DropdownItem>
      <DropdownItem><a href="/transactions">Transactions</a></DropdownItem>
      <DropdownItem><a href="/options">Paramètres</a></DropdownItem>
      <DropdownDivider/>
      <DropdownItem><Button href="" class="font-bold !bg-transparent">Deconnexion</Button></DropdownItem>
    </Dropdown>
    </NavUl>

  </Navbar>
<!--  <Drawer-->
<!--    transitionType="fly"-->
<!--    {backdrop}-->
<!--    {transitionParams}-->
<!--    bind:hidden={drawerHidden}-->
<!--    bind:activateClickOutside-->
<!--    width="w-64"-->
<!--    class="overflow-scroll  hidden  pb-32"-->
<!--    id="sidebar"-->
<!--  >-->
<!--    <div class="flex items-center">-->
<!--      <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />-->
<!--    </div>-->
<!--    <Sidebar asideClass="w-54">-->
<!--      <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">-->
<!--        <SidebarGroup>-->
<!--          <SidebarItem label="Accueil" href="/" on:click={toggleSide} active={activeUrl === `/`} />-->
<!--          <SidebarItem-->
<!--            label="À propos"-->
<!--            href="/pages/about"-->
<!--            {spanClass}-->
<!--            on:click={toggleSide}-->
<!--            active={activeUrl === '/pages/about'}-->
<!--          />-->
<!--          <SidebarDropdownWrapper label="Services">-->
<!--            <SidebarItem-->
<!--              label="IPFS"-->
<!--              href={`/ipfs`}-->
<!--              {spanClass}-->
<!--              on:click={toggleSide}-->
<!--              active={activeUrl === '/ipfs'}-->
<!--            />-->
<!--            <SidebarItem-->
<!--              label="FileSystem"-->
<!--              href="/fs"-->
<!--              {spanClass}-->
<!--              on:click={toggleSide}-->
<!--              active={activeUrl === '/fs'}-->
<!--            />-->
<!--            <SidebarItem-->
<!--                    label="AWS S3"-->
<!--                    href="/s3"-->
<!--                    {spanClass}-->
<!--                    on:click={toggleSide}-->
<!--                    active={activeUrl === '/s3'}-->
<!--            />-->
<!--          </SidebarDropdownWrapper>-->
<!--        </SidebarGroup>-->
<!--      </SidebarWrapper>-->
<!--    </Sidebar>-->
<!--  </Drawer>-->
  <div class="flex px-4 h-screen w-screen bg-gray-200 ">
    <main class=" w-3/4  ml-auto mr-auto">
      <slot />
    </main>
  </div>
  {:else}
  <div class="!bg-black h-screen absolute mt-0">
    <Login />

  </div>
{/if}