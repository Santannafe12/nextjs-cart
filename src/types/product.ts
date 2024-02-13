export type Product = {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
  quantity?: number;
};
