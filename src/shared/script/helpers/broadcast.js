import Vue from 'vue';
import i18n from '@/i18n.js'
import API from '@/shared/script/api/api.js';

const broadcastTransferKey = 'cv-broadcast-message';

export default {

  listen () {
    if (!window.BROADCAST_LISTENER) {
      window.BROADCAST_LISTENER = window.addEventListener('storage', this.exec);
    }
  },

  send (action, data = undefined) {
    localStorage.setItem(broadcastTransferKey, JSON.stringify({ action: action, data: data, broadcast: true }));
    localStorage.removeItem(broadcastTransferKey);
  },

  exec (e) {
    if (e.key != broadcastTransferKey ) {
      return false;
    }
    
    const message = JSON.parse(e.newValue);

    if (message && message.broadcast) {
      let action = message.action
      let data = message.data;

      const actions = {
      
        disconnect (data) {
          const defaultMessage = i18n.t('errors.sessionClosed');
          const app = document.getElementById('app');
  
          app.style.opacity = '.3';
          app.style.pointerEvents = 'none';
  
          if (!data.logged) {
            API.signOut(false);
          }
  
          return Vue.toasted[data.type](data.message || defaultMessage, {
            duration: 0,
            action: {
              text : 'OK',
              onClick : () => window.location.href = '/'
            }          
          });
        },
  
      };
  
      return actions[action] ? actions[action](data) : null;
    }
  }
}