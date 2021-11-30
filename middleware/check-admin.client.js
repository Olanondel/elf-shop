export default function({ store, redirect }) {
  // If the user is not admin

  if (!store.state.isAdmin) {
    return redirect('/')
  }
}
