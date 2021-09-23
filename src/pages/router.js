import { wrap } from "svelte-spa-router/wrap";

const link = import.meta.env.VITE_MGL_AUTH0_LINK
const cid = import.meta.env.VITE_MGL_AUTH0_CID
const aud = import.meta.env.VITE_MGL_AUTH0_AUDIENCE
const red = import.meta.env.VITE_MGL_AUTH0_REDIRECT

const aut0Link = `${link}authorize?response_type=token&client_id=${cid}&redirect_uri=${red}&audience=${aud}`

function login(key) {
  if (localStorage.getItem(key)) {
    return true
  } else {
    return false
  }
}

export default {
  '/': wrap({
    asyncComponent: () => import('./home/Index.svelte'),
    userData: {"pageTitle": "Game List"}
  }),

  '/login': wrap({
    asyncComponent: () => import('./login/Login.svelte'),
    userData: {
      "pageTitle": "login",
      "redirect": true,
      "link": aut0Link
    }
  }),

  '/my-gamelist': wrap({
    asyncComponent: () => import('./mygame/MyGame.svelte'),
    userData: {
      "pageTitle": "My Gamelist 🚀",
      "page": "user-page"
    },
    conditions: [
      () => {
        if (login('MGL_User')) {
          return true
        }else {
          return false
        }
      }
    ]
  }),

  '/logout': wrap({
    asyncComponent: () => import('./home/Index.svelte'),
    userData: {
      "pageTitle": "Log out",
      "logout": true
    }
  }),
  
  '*': wrap({
    asyncComponent: () => import('./notfound/NotFound.svelte'),
    userData: {"pageTitle": ":/"}
  })
}