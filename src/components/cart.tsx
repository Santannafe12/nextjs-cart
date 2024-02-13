"use client"

import { CartContext, CartItem } from "@/context/cart";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
    const { cartItems, handleRemoveFromCart } = useContext(CartContext)!;
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (cartItems) {
            setIsLoading(false);
        }
    }, [cartItems]);

    return (
        <div>
            <h1>Cart</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {cartItems && cartItems.length > 0 ? (
                        <div>
                            {cartItems.map((item: CartItem, index: number) => (
                                <div key={index}>
                                    <h2>{item.product.name}</h2>
                                    <p>{item.product.description}</p>
                                    <Image src={item.product.image.url} alt={item.product.name} width={300} height={200} />
                                    <p>Quantity: {item.quantity}</p>
                                    <input
                                        type="number"
                                        min={1}
                                        max={item.quantity}
                                        value={selectedQuantity}
                                        onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                                    />
                                    <button onClick={() => handleRemoveFromCart(item.product.id, selectedQuantity)}>Remove from cart</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h2>Cart is empty</h2>
                    )}
                </>
            )}
        </div>
    );
}
