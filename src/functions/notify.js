import { Notify } from 'quasar'
export function NotifyUser(msg) {
  // could use a Dialog plugin but we want to use this outside of a vue component
  // quasar lets us do that, see quasar plugins Dialog usage
  Notify.create({
    color: 'orange-4',
    textColor: 'black',
    icon: 'sentiment_satisfied_alt',
    message: msg
  })
}
