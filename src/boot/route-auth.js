import { LocalStorage } from 'quasar'

// "async" is optional
export default ({ router/* app, router, Vue, ... */ }) => {
  router.beforeEach((to, from, next) => {
  	let loggedIn = LocalStorage.getItem('loggedIn')
  	if (!loggedIn && to.path !== '/auth') {
		try {
			next('/auth')
		} catch (error) {}  
  	}
  	else {
	    next()
  	}
  })
}
