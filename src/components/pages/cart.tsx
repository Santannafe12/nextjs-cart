"use client"

import { CartContext, CartItem } from "@/context/cart";
import { useContext, useEffect, useState } from "react";
import SkeletonDemo from "../common/skeleton";
import { TypographyH1, TypographyH2, TypographyMuted, TypographyP } from "../common/typography";
import HorizontalCard from "../common/horizontal-card";
import WhatsApp from "../whatsapp/whatsapp";
import { BellRing } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, count } = useContext(CartContext)!;
    const [isLoading, setIsLoading] = useState(true);

    const cardItemCount = count();

    useEffect(() => {
        if (cartItems) {
            setIsLoading(false);
        }
    }, [cartItems]);

    return (
        <div className="min-h-screen w-11/12 mx-auto">

            {isLoading ? (
                <SkeletonDemo />
            ) : (
                <>
                    {cartItems && cartItems.length > 0 ? (
                        <>
                            <TypographyH1 className="border-none">Meu carrinho</TypographyH1>
                            <TypographyMuted className="mb-4">Você possui {cardItemCount} produtos no carrinho.</TypographyMuted>
                            <div className="flex flex-col gap-4 mb-4">
                                {cartItems.map((item: CartItem, index: number) => (
                                    <HorizontalCard key={index} product={item.product} />
                                ))}
                            </div>
                            <WhatsApp />
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <TypographyH2 className="flex gap-2 items-center border-none p-0"><BellRing className="h-8 w-8 hidden sm:block" /> Seu carrinho está vazio!</TypographyH2>
                            <TypographyP className="text-muted-foreground ">Explore nossos produtos enquanto isso.</TypographyP>
                            <section>
                                <Link href={"/products"}><Button>Adicionar Produtos</Button></Link>
                            </section>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
