/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.VUE_APP_SW_ENABLE && process.env.NODE_ENV === 'production') {
  register(`./service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },

    error (error) {
      console.error('Error during service worker registration:', error)
    },
    
    updated () {
      console.log('New content is available, the outdated cache has been deleted; please refresh.')
      
      caches.keys().then(function(names) {
        for (let name of names) caches.delete(name);
      });    
    },    

    // registered () {
    //   console.log('Service worker has been registered.')
    // },

    // cached () {
    //   console.log('Content has been cached for offline use.')
    // },

    // updatefound () {
    //   console.log('New content is downloading.')
    // },

    // offline () {
    //   console.log('No internet connection found. App is running in offline mode.')
    // },
  });
}

/* eslint-enable no-console */