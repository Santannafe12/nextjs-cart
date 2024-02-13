"use client"

import { Product } from "@/types/product";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { CartContext } from "@/context/cart";
import { toast } from "../ui/use-toast";

export default function ProductCard({ product }: { product: Product }) {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext is not provided!");
    }

    const { handleAddToCart } = cartContext;

    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

    const handleIncrementQuantity = (productId: string) => {
        setTimeout(() => {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: (prevQuantities[productId] || 1) + 1,
            }));
        }, 100);
    };

    const handleDecrementQuantity = (productId: string) => {
        setTimeout(() => {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
            }));
        }, 100);
    };

    const handleAddProductToCart = (product: Product, quantity: number) => {
        handleAddToCart(product, quantity);
        playAudio();

        toast({
            title: "Produto Adicionado com sucesso!",
            variant: "success",
        });

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [product.id]: 1,
        }));
    };

    const audioPlayer = useRef<HTMLAudioElement>(null);

    function playAudio() {
        if (audioPlayer.current) {
            audioPlayer.current.volume = 0.2;
            audioPlayer.current.play();
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <Image src={product.image.url} alt={product.name} width={350} height={350} className="aspect-square object-scale-down mb-4" />
                <div className="flex flex-wrap items-start justify-between">
                    <CardTitle className="pb-2 max-w-[200px] line-clamp-2 h-14">
                        {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                        <Button size="icon" variant="secondary" onClick={() => handleDecrementQuantity(product.id)}><Minus className="w-4 h-4" /></Button>
                        <Button size="icon" variant="secondary" className="cursor-default">{quantities[product.id] || 1}</Button>
                        <Button size="icon" variant="secondary" onClick={() => handleIncrementQuantity(product.id)}><Plus className="w-4 h-4" /></Button>
                    </div>
                </div>
                <CardDescription className="text-justify overflow-auto pr-2">Descrição curta do produto.</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col">
                <Button variant="outline" className="flex flex-col justify-between w-full" onClick={() => handleAddProductToCart(product, quantities[product.id] || 1)}>
                    <div className="w-full flex gap-2 items-center justify-center">
                        <ShoppingBag /> Adicionar ao Carrinho
                    </div>
                </Button>
            </CardFooter>
            <audio ref={audioPlayer} src="/audio/success.mp3" />
        </Card>
    )
}