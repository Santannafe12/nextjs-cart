"use client"

import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useContext, } from "react";
import { CartContext } from "@/context/cart";
import { Product } from "@/types/product";
import { Minus, Plus } from "lucide-react";

export default function HorizontalCard({ product }: { product: Product }) {
    const { handleRemoveFromCart, handleAddToCart, handleRemoveProduct, productQuantity } = useContext(CartContext)!;

    const quantity = productQuantity(product.id);

    const selectedQuantity = Number(1);

    const handleRemoveProductCart = (productId: string, quantityTotal: number, quantityToBeRemoved: number) => {
        if (quantityTotal === 1) {
            handleRemoveProduct(productId)
        }
        else {
            handleRemoveFromCart(productId, quantityToBeRemoved);
        }
    };

    const handleAddProduct = (product: any) => {
        handleAddToCart(product, selectedQuantity);
    };

    return (
        <Card className="w-8/12">
            <CardHeader className="flex flex-row gap-12">
                <Image src={product.image.url} alt={product.name} width={200} height={200} className="aspect-square object-scale-down mb-4" />
                <div className="space-y-2">
                    <CardTitle className="pb-2">
                        {product.name}
                    </CardTitle>
                    <CardDescription>
                        {product.description}
                    </CardDescription>
                    <section className="flex flex-col gap-1">
                        <strong className="text-sm text-muted-foreground cursor-default select-none">
                            Quantidade: {quantity}
                        </strong>
                        <div className="flex gap-2">
                            <Minus className="p-[1px] rounded-md bg-primary-foreground h-6 w-6 cursor-pointer text-red-600 hover:text-red-800" onClick={() => handleRemoveProductCart(product.id, quantity, 1)} />
                            <Plus className="p-[1px] rounded-md bg-primary-foreground h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800" onClick={() => handleAddProduct(product)} />
                        </div>
                    </section>
                </div>
            </CardHeader>
        </Card>
    )
}