import i18n from '@/i18n'
import store from '@/store'
import HttpClient from './httpClient.js'

export default {

	get (p) {
		HttpClient.get(p.endpoint)
			.then(resp => {
				if (p.success) {
					p.success(resp);
				}
			})
			.catch(error => {
				if (p.error) {
					p.error(this.getError(error));
				}
			})
			.finally(() => {
				if (p.finally) {
					p.finally();
				}
			});
	},

	post (p) {
		HttpClient.post(p.endpoint, p.data)
			.then(response => {
				if (p.success) {
					p.success(response.data);
				}
			})
			.catch(error => {
				if (p.error) {
					p.error(this.getError(error));
				}
			})
			.finally(() => {
				if (p.finally) {
					p.finally();
				}
			});
	},

	getError (obj) {
		console.error(obj);
		
		if (obj.response && obj.response.data) {
			return obj.response.data.errors || obj.response.data.message || obj.response.data.error || obj.response.data;
		} else {
			return i18n.t('errors.unexpectedError');
		}
	},

	// -------------------------------------------------

	getDefaultLocale () {
		const localeOnStorage = window.localStorage && window.localStorage.getItem('cv-online-locale');

		if (localeOnStorage) {
			return localeOnStorage;
		}
		
		if (navigator && navigator.language) {
			const browserShortLocale = navigator.language.split('-')[0];
			
			return browserShortLocale.toLowerCase() === 'pt' ? 'pt-br' : 'en';
		}
		
		return 'en';
	},

	getCredentials () {
		return new Promise((resolve, reject) => {
      this.get({
        endpoint: '/account/getcredentials',
				success: response => {
					const credentials = response.data;

					if (!credentials.lang) {
						credentials.lang = this.getDefaultLocale();
					}

					resolve(credentials);
				},
				error: reject
      });
		});
	},

	getCurriculum (username) {
		return new Promise((resolve, reject) => {
			this.get({
				endpoint: `/curriculum/get?username=${username}`,
				success: response => resolve(response.data),
				error: reject
			});
		});
	},

	signInWithEmail (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'auth/signin',
				data: data,
				success: resolve,
				error: reject
			});
		});
	},

	signInWithFacebook (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/auth/facebook',
				data: data,
				success: resolve,
				error: reject
			});
		});
	},

	register (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'auth/register',
				data: data,
				success: data => data.errors && data.errors.length ? reject(data.errors) : resolve(data),
				error: reject,
			});
		});
	},

	forgotPass (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'account/forgotpassword',
				data: { task:'create', ...data },
				success: resolve,
				error: reject,
			});
		});
	},

	saveCv (data) {
		return new Promise((resolve, reject) => {
			return this.post({
				endpoint: '/curriculum/save',
				data: data,
				success: data => (data && data.saved) ? resolve(data) : reject(data.error || i18n.t('errors.unexpectedError')),
				error: reject,
			});
		});
	},

	unlockCv (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/curriculum/get',
				data: data,
				success: resolve,
				error: reject,
			})
		});
	},

	sendEmailToUser (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/curriculum/sendemail',
				data: data,
				success: resolve,
				error: reject
			});
		});
	},

	changeUsername (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/account/changeusername',
				data: data,
				success: data => data.updated ? resolve(data) : reject(false),
				error: reject,
			});
		});		
	},

	changeUserEmail (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/account/changeemail',
				data: data,
				success: data => data.updated ? resolve(data) : reject(false),
				error: reject,
			})
		});
	},

	changeUserPassword (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/account/changepassword',
				data: data,
				success: data => data.updated ? resolve(data) : reject(false),
				error: reject
			})
		});
	},

	signOut (refresh = true) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'auth/signout',
				success: () => { 
					if (refresh) window.location.href = '/'; 
				
					resolve() 
				},
				error: reject
			});		
		});
	},

	deactivateAccount (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: '/account/deactivate',
				data: data,
				success: resolve,
				error: reject
			});		
		});
	},

	confirmRegistration (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'auth/confirm',
				data: data,
				error: reject,
				success: data => (data.ok && !data.errors ? resolve(data) : reject(i18n.t('errors.unexpectedError'))),
			});
		});
	},

	checkUsername (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'account/checkusername',
				data: data,
				success: resolve,
				error: reject
			});		
		});
	},

	checkResetPasswordHash (data) {
		data.task = 'validate';

		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'account/forgotpassword',
				data: data,
				error: reject,
				success: data => data.ok ? resolve(data) : reject(i18n.t('errors.operationFailed')),
			});			
		});
	},

	resetPassword (data) {
		data.task = 'reset';

		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'account/forgotpassword',
				data: data,
				error: reject,
				success: data => data.ok ? resolve(data) : reject(i18n.t('errors.operationFailed')),
			});		
		});
	},

	uploadFile (data, url) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: url,
				data: data,
				success: resolve,
				error: reject,
			})
		});		
	},

	setUserAvatar (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'avatar/setuseravatar',
				data: data,
				success: resolve,
				error: reject,
			})
		});
	},

	removeUserAvatar() {
		return new Promise((resolve, reject) => {
			this.get({
				endpoint: 'avatar/removeavatar',
				success: resolve,
				error: reject,
			})
		});		
	},

	changeAppLocale (lang, logged) {
		return new Promise((resolve, reject) => {
			i18n.locale = lang;
			store.state.credentials.lang = lang;
			
			if (!logged) {
				window.localStorage && window.localStorage.setItem('cv-online-locale', lang);

				resolve();
			} else {				
				store.state.curriculum.lang = lang;

				this.post({
					endpoint: 'account/changelanguage',
					data: { lang },
					success: resolve,
					error: reject,
				});
			}
		});
	},

	reportCv (data) {
		return new Promise((resolve, reject) => {
			this.post({
				endpoint: 'curriculum/report',
				data: data,
				success: resolve,
				error: reject
			})
		});
	},

	cvSearchSimple (subject, page) {
		return new Promise((resolve, reject) => {
			this.get({
				endpoint: `search/simple?subject=${subject}&page=${page}`,
				success: resolve,
				error: reject,				
			})
		});
	}
}