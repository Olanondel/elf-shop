import { getAuth, onAuthStateChanged } from "firebase/auth";

export default ({ store }) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit('setAdmin', true)
    } else {
      store.commit('setAdmin', null)
    }
  });
}
