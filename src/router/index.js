import Vue from 'vue'
import Router from 'vue-router'

const Cv = () => import( /* webpackChunkName: "Cv-View" */ '../views/Cv.vue' )
const Home = () => import( /* webpackChunkName: "Home-View" */ '../views/Home.vue' )
const Terms = () => import( /* webpackChunkName: "Terms-View" */ '../views/Terms.vue' )
const Contact = () => import( /* webpackChunkName: "Contact-View" */ '../views/Contact.vue' )
const ResetPass = () => import( /* webpackChunkName: "ResetPass-View" */ '../views/ResetPass.vue' )
const ConfirmReg = () => import( /* webpackChunkName: "ConfirmReg-View" */ '../views/ConfirmReg.vue' )
const ErrorView = () => import( /* webpackChunkName: "ErrorView-View" */ '../views/Error.vue' )
const SuccessView = () => import( /* webpackChunkName: "SuccessView-View" */ '../views/Success.vue' )
const Settings = () => import( /* webpackChunkName: "Settings-View" */ '../views/Settings.vue' )
const NotFound = () => import( /* webpackChunkName: "Not-Found" */ '@/components/NotFound/NotFound.vue' )

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	
	scrollBehavior () {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({ x: 0, y: 0 })
			}, 250);
		});
	},
	
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/cv/:user?',
			name: 'cv',
			component: Cv,
			beforeEnter: (to, from, next) => {
				!to.params.user ? next({ name: 'home' }) : next();
      }
		},
		{
			path: '/confirm/',
			name: 'confirm',
			component: ConfirmReg
		},
		{
			path: '/reset-pass/',
			name: 'reset-pass',
			component: ResetPass
		},
		{
			path: '/contact/',
			name: 'contact',
			component: Contact
		},
		{
			path: '/terms/',
			name: 'terms',
			component: Terms
		},
		{
			path: '/error/',
			name: 'error',
			component: ErrorView
		},
		{
			path: '/success/',
			name: 'success',
			component: SuccessView
		},		
		{
			path: '/settings/',
			name: 'settings',
			component: Settings,
		},
		{ 
			path: '*',
			name: '404',
			component: NotFound,
			beforeEnter: (to, from, next) => {
				const pathTo = to.params.pathMatch;
				const tryToCv = pathTo && pathTo.split('/').filter(x => x.length).length === 1;
	
				tryToCv ? (window.location.href = `cv/${to.params.pathMatch.replace(/\//g, '')}`) : next();
			}			
		}
	]
});