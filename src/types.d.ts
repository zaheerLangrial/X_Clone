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