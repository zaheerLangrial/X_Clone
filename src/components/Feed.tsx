import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

import { app } from "../firebase";
import Post from "./Post";
import { IPost } from "@/types";

export default async function Feed() {

  const db = getFirestore(app);

  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  const querySnapshot = await getDocs(q);

  let data: any[] = [];

  querySnapshot.forEach((doc) => {
    data?.push({ ...doc?.data(), id: doc?.id });
  });

  return (
    <div>
      {data?.map((post) => (
        <Post key={post.id} post={post as IPost} id={post.id as string} />
      ))}
    </div>
  );
}
