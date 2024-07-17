import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { app } from "@/firebase";
import { IPost } from "@/types";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";

type IProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: IProps) => {
  const db = getFirestore(app);
  let data: IPost;
  const querySnapshot = await getDoc(doc(db, "posts", params?.id));
  data = { ...querySnapshot.data(), id: querySnapshot?.id } as IPost;
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <Link href={"/"} className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>
      <Post post={data as IPost} id={data?.id} />
      <Comments id={params?.id} />
    </div>
  );
};

export default page;
