export interface INews {
  author: string;
  content: string;
  description: string;
  publishedAt: string; // Assuming this is in ISO 8601 format
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
}

export type IPost = {
  profileImg: string;
  uid: string;
  text: string;
  image: string;
  name: string;
  username: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
};

interface IComment {
  comment: string;
  name: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  userImage: string;
  username: string;
}
