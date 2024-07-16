"use client";

import { app } from "@/firebase";
import { UploadedFile } from "@/types";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function Input() {
  const { data: session } = useSession();
  const imagePicRef = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | any>();
  const [imageFileUrl, setImageFileUrl] = useState<string | null>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [text, setText] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const db = getFirestore(app);

  const addImageToPost = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setUploadLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload Progress " + progress + "% Done");
      },
      (error) => {
        setUploadLoading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setUploadLoading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session?.user?.uid,
      name: session?.user?.name,
      username: session?.user?.username,
      text,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl,
    });
    setPostLoading(false);
    setText("");
    setImageFileUrl(null);
    setSelectedFile(null);
    location.reload();
  };

  if (!session) return null;

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={session?.user?.image}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 "
          placeholder="Whats happening"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {selectedFile && (
          <img
            src={imageFileUrl as string}
            alt="image"
            className={`w-full max-h-[250px] object-cover cursor-pointer
                ${uploadLoading ? "animate-pulse" : ""}`}
          />
        )}
        <div className="flex items-center justify-between pt-2.5">
          <input
            type="file"
            accept="image/*"
            ref={imagePicRef}
            onChange={addImageToPost}
            className="hidden"
          />
          <HiOutlinePhotograph
            onClick={() => imagePicRef?.current?.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />
          <button
            disabled={text.trim() === "" || postLoading || uploadLoading}
            onClick={handleSubmit}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
