"use server";

import { Product } from "@/types/product";
import { gql } from "@apollo/client";

import { redirect } from "next/navigation";
import { getClient } from "../db/apollo";

const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

export async function getProducts(): Promise<Product[]> {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_PRODUCTS,
      context: {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      },
    });
    return data.products;
  } catch (error) {
    console.error("Erro ao buscar posts", error);
  }

  redirect("/internal-server-error");
}
