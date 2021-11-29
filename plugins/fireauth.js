import { getAuth, onAuthStateChanged } from "firebase/auth";

export default ({ store }) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user?.uid === 'cbUCmm736hhPVQY3i3vP6nHrnqx1') {
      store.commit('setAdmin', true)
    } else {
      store.commit('setAdmin', null)
    }
  });
}
