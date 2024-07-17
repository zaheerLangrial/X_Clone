"use client";
import { app } from "@/firebase";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";

type iProps = {
  id: string;
};

const Comments = ({ id }: iProps) => {
  const db = getFirestore(app);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot?.docs as []);
      }
    );
  }, [db, id]);

  return (
    <div>
      {comments.map((comment: any) => {
        return (
            <Comment key={comment?.id} comment={comment?.data()} id={comment.id} />
        )
      })}
    </div>
);
};

export default Comments;
