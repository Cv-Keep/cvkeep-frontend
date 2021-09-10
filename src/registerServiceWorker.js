/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.VUE_APP_SW_ENABLE && process.env.VUE_APP_SW_ENABLE !== 'false') {
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
      
      caches.keys().then(names => {
        for (let name of names) caches.delete(name);
      });    
    },    

    offline () {
      console.log('No internet connection found. App is running in offline mode.')
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

  });
}

/* eslint-enable no-console */