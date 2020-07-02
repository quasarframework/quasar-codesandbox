import { LocalStorage } from 'quasar'
// This is how we make changes to the router on boot up
export default ({ router }) => {
  console.log('boot dir, running router-auth.js')
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.name !== 'Login' && to.name !== 'Signup') {
      console.log(' calling Signup from router-auth...')
      next({
        name: 'Signup'
      })
    } else {
      console.log(' Just doing next() from router-auth...')
      next()
    }
  })
}
