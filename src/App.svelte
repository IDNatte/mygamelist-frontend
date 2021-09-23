<style>
  main {
    display: block;
  }

  .router-wrapper {
    width: auto;
    margin-left: 5%;
    padding: 20px 30px;
  }
</style>

<script>
  import SidebarComponent from './components/sidebar/SidebarComponent.svelte'
  import NavbarComponent from './components/navbar/NavbarComponent.svelte'
  import Router, { replace } from 'svelte-spa-router'
  import router from './pages/router'
  import { onMount } from 'svelte'

  const routes = router
  let navbarTitle
  let logedIn

  function setLogin(value, key) {
    if (!localStorage.getItem(key)) {
      let parseValue = JSON.stringify(value)
      localStorage.setItem(key, parseValue)
    }
  }

  function checkLogin(key) {
    return localStorage.getItem(key)
  }

  function clearLogin(key) {
    localStorage.removeItem(key)
  }

  function getFragment() {
    /*
    *
    *
    * reference @ https://stackoverflow.com/a/47628324
    * 
    */

    let hash = location.hash.substring(1)
    let params = {}
    hash.split('&').map(key => {
      let temp = key.split('=')
      params[temp[0]] = temp[1]
    })

    return params
  }

  function routerLoaded(e) {
    let redirect = e.detail.userData.redirect
    let logout = e.detail.userData.logout
    navbarTitle = e.detail.userData.pageTitle

    if (redirect) {
      let link = e.detail.userData.link
      location.replace(link)
    }

    let token = getFragment()
    if (token.access_token) {
      setLogin(token, 'MGL_User')
      logedIn = true
      replace('/')
    }

    if (logout) {
      clearLogin('MGL_User')
      logedIn = false
      replace('/')
    }
  }

  function unauthorized(e) {
    if (e.detail.userData.page == 'user-page') {
      replace('/')
    }
  }

  onMount(() => {
    if (checkLogin('MGL_User')) {
      logedIn = true
    }else {
      logedIn = false
    }
  })
</script>

<main class="application">
  <SidebarComponent logedIn={ logedIn }/>

  <NavbarComponent titleText={navbarTitle}/>

  <div class="router-wrapper">
    <Router {routes} on:routeLoaded={ routerLoaded } on:conditionsFailed={ unauthorized } />
  </div>
</main>


