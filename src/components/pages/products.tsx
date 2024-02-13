"use client"

import { CartContext } from "@/context/cart";
import { Product } from "@/types/product";
import { useContext, useState } from "react";
import ProductCard from "../common/card";
import { TypographyH1 } from "../common/typography";

interface ProductsProps {
    products: Product[];
}

export default function ProductsPage({ products }: ProductsProps) {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext is not provided!");
    }

    return (
        <div className="min-h-screen w-11/12 mx-auto">
            <TypographyH1 className="mb-4">Produtos</TypographyH1>
            <section className="w-full mx-auto flex flex-wrap gap-8 justify-center lg:justify-start">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </section>
        </div>
    );
}
