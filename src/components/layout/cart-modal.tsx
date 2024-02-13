import { BellRing, Check, Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CartContext } from "@/context/cart"
import { useContext, useEffect, useState } from "react"
import SkeletonDemo from "../common/skeleton"
import Link from "next/link"
import { usePathname } from "next/navigation"

type CardProps = React.ComponentProps<typeof Card>

export function CartModal({ className, ...props }: CardProps) {
    const { cartItems, handleRemoveFromCart, handleAddToCart, handleRemoveProduct, count } = useContext(CartContext)!;
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname()

    const selectedQuantity = Number(1);
    const cardItemCount = count();

    useEffect(() => {
        if (cartItems) {
            setIsLoading(false);
        }
    }, [cartItems]);

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
        <>
            {/* {isLoading ? (
                <SkeletonDemo />
            ) : ( */}
            <Card className={cn("absolute right-4 sm:right-12 mt-4", className)} {...props}>
                {cardItemCount === 0 ? (
                    <CardHeader className="flex justify-center items-center">
                        <section className="flex gap-2 items-center">
                            <BellRing className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">Carrinho vazio</p>
                        </section>
                        {pathname === "/products" ? null :
                            (
                                <CardDescription>
                                    <Link href={"/products"}><Button>Adicionar Produtos</Button></Link>
                                </CardDescription>
                            )}
                    </CardHeader>
                ) : (
                    <>
                        <CardHeader>
                            <CardTitle>Meu Carrinho</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div>
                                {cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <section className="flex gap-1 justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground cursor-default select-none">
                                                    Quantidade: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Minus className="p-[1px] rounded-md bg-primary-foreground h-8 w-8 cursor-pointer text-red-600 hover:text-red-800" onClick={() => handleRemoveProductCart(item.product.id, item.quantity, 1)} />
                                                <Plus className="p-[1px] rounded-md bg-primary-foreground h-8 w-8 cursor-pointer text-gray-600 hover:text-gray-800" onClick={() => handleAddProduct(item.product)} />
                                            </div>
                                        </section>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={'/cart'} className="w-full select-none">
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <Check className="mr-2 h-4 w-4" /> Solicitar orçamento
                                </Button>
                            </Link>
                        </CardFooter>
                    </>
                )}
            </Card>
            {/* )} */}
        </>
    )
}
