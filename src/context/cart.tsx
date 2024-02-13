"use client"

import React, { createContext, useEffect, useState } from "react";
import { Product } from "@/types/product";

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    handleAddToCart: (product: Product, quantity: number) => void;
    handleRemoveFromCart: (productId: string, quantity: number) => void;
    handleRemoveProduct: (productId: string) => void;
    productQuantity: (productId: string) => number;
    count: () => number;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddToCart = (product: Product, quantity: number) => {
        const existingCartItem = cartItems.find(item => item.product.id === product.id);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map(item => {
                if (item.product.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            const newCartItem: CartItem = {
                product,
                quantity
            };
            const updatedCartItems = [...cartItems, newCartItem];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };

    const handleRemoveFromCart = (productId: string, quantity: number) => {
        const existingCartItem = cartItems.find(item => item.product.id === productId);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map(item => {
                if (item.product.id === productId) {
                    const newQuantity = item.quantity - quantity;
                    return {
                        ...item,
                        quantity: newQuantity >= 0 ? newQuantity : 0
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };

    const handleRemoveProduct = (productId: string) => {
        const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    const productQuantity = (productId: string) => {
        const existingCartItem = cartItems.find(item => item.product.id === productId);
        if (existingCartItem) {
            return existingCartItem.quantity;
        }
        return 0;
    }

    const count = () => {
        return cartItems.length;
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const cartContextValue: CartContextType = {
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleRemoveProduct,
        productQuantity,
        count
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};
