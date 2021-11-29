import { db } from '~/plugins/firebase'
import { collection, updateDoc, doc, setDoc, serverTimestamp, getDoc, getDocs } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default () => ({

  async getId(folder) {
    return doc(collection(db, 'orders')).id
  },

  async set(folder, payload) {
    const id = payload.id || await this.getId(folder)

    await setDoc(doc(db, folder, id), {
      timestamp: serverTimestamp(),
      ...payload,
      id
    } )
  },

  async update(folder, payload) {
    const ref = doc(db, folder, payload.id)

    await updateDoc(ref, {
      timestamp: serverTimestamp(),
      ...payload
    })
  },

  async readOne(folder, id) {
    const ref = doc(db, folder, id)

    const docSnap = await getDoc(ref)

    return docSnap.data()
  },

  async read(folder) {
    const docsSnap = await getDocs(collection(db, folder))

    const data = []

    docsSnap.forEach(el => data.push(el.data()))

    return data
  },

  async login(email, password) {
    const auth = getAuth()

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
  },

  async uploadImage(folder, id, file, fileName) {
    const storage = getStorage()
    const imageRef = ref(storage, `${folder}/elfbars/${id}/${fileName}`)

    await uploadBytes(imageRef, file)

    return await getDownloadURL(imageRef)
  }

})
