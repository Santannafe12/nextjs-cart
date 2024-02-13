"use client"

import { CartContext } from "@/context/cart";
import { Product } from "@/types/product";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductsProps {
    products: Product[];
}

export default function Products({ products }: ProductsProps) {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext is not provided!");
    }

    const { handleAddToCart } = cartContext;
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

    const handleQuantityChange = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Number(event.target.value),
        }));
    };

    return (
        <div>
            <section className="w-10/12 mx-auto flex flex-wrap justify-between gap-8">
                {products.map((product, index) => (
                    <div key={index} className="w-96 flex flex-col">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <Image src={product.image.url} alt={product.name} width={300} height={200} />
                        <input
                            type="number"
                            value={quantities[product.id] || 0}
                            onChange={(event) => handleQuantityChange(product.id, event)}
                            className="w-full p-4 mb-4"
                        />
                        <button
                            onClick={() => handleAddToCart(product, quantities[product.id] || 0)}
                            className="w-full p-4 bg-red-600 text-white"
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}
