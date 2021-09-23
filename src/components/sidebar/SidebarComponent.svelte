<style>
  a {
    color: white !important;
    text-decoration: none;
  }

  .logo img {
    width: 50px;
    height: auto;
  }
  
  .sidebar {
    min-width: 5%;
    display: flex;
    position: fixed;
    min-height: 100vh;
    padding: 20px 20px;
    align-items: center;
    flex-direction: column;
    background-color: #4A306D;
    justify-content: space-between;
  }

  .navigation {
    display: flex;
    min-height: 50vh;
    flex-direction: column;
  }

  .nav-btn {
    width: 100% !important;
    padding: 10px 0px;
    margin: 5px 0;
  }
</style>

<script>
  import UserFavorite32 from "carbon-icons-svelte/lib/UserFavorite32"
  import GameConsole32 from "carbon-icons-svelte/lib/GameConsole32"
  import Logout32 from "carbon-icons-svelte/lib/Logout32"
  import Login32 from "carbon-icons-svelte/lib/Login32"
  import tooltip from 'svelte-tooltip-action'
  import { link } from 'svelte-spa-router'

  import logo from '../../assets/logo.svg'

  const tooltipStyle = 'background-color: #717171; color: white; margin-left: 10px; text-transform: capitalize;'

  export let logedIn;
</script>

<div class="sidebar">
  <div class="logo">
    <a href="/" use:link>
      <img src={logo} alt="">
    </a>
  </div>

  <div class="navigation">
    <a class="nav-btn" href="/" use:tooltip={{text: 'game list', style: tooltipStyle}} use:link>
      <GameConsole32 />
    </a>
    {#if !logedIn}
    <a class="nav-btn" href="/login" use:tooltip={{text: 'Sign in', style: tooltipStyle}} use:link>
      <Login32 />
    </a>
    {:else if logedIn}
    <a class="nav-btn" href="/my-gamelist" use:tooltip={{text: 'My Gamelist', style: tooltipStyle}} use:link>
      <UserFavorite32 />
    </a>
    <a class="nav-btn" href="/logout" use:tooltip={{text: 'Sign out', style: tooltipStyle}} use:link>
      <Logout32 />
    </a>
    {/if}
  </div>
</div>