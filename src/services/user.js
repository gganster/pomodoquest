import { getFirestore, collection, doc } from "firebase/firestore";

const db = getFirestore();

export const createUser = async (user) => {
  try {
    await doc(collection(db, "users", user.uid), user).set(user);
  } catch (e) {
    console.error(e);
  }
}

export const getUser = async (uid) => {
  try {
    const user = await doc(collection(db, "users", uid)).get();
    return user.data();
  } catch (e) {
    console.error(e);
  }
}

export const updateUser = async (user) => {
  try {
    await doc(collection(db, "users", user.uid)).update(user);
  } catch (e) {
    console.error(e);
  }
}

export const deleteUser = async (uid) => {
  try {
    await doc(collection(db, "users", uid)).delete();
  } catch (e) {
    console.error(e);
  }
}