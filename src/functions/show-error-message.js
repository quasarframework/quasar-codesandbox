import { Dialog } from 'quasar'
export function ShowErrorMessage(errorMessage) {
  // could use a Dialog plugin but we want to use this outside of a vue component
  // quasar lets us do that, see quasar plugins Dialog usage
  Dialog.create({
    // we need some dialog options here, check Dialog API, methods
    title: 'Error',
    message: errorMessage
  })
}
