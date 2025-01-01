import { getAuth, onAuthStateChanged } from "firebase/auth";

export default ({ store }) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user?.uid === process.env.NUXT_ENV_ADMIN_ID) {
      store.commit('setAdmin', true)
    } else {
      store.commit('setAdmin', null)
    }
  });
}
