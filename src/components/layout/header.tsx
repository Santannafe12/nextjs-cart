"use client";

import Link from "next/link";

import { Code, Menu, X, ShoppingCart } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CartModal } from "./cart-modal";

const links = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Produtos",
        href: "/products",
    },
];

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const pathname = usePathname();

    const handleNavOpen = () => {
        setIsNavOpen(!isNavOpen);
        setIsCartModalOpen(false); // Close the cart modal when opening the menu
    };

    const handleCartModal = () => {
        setIsCartModalOpen(!isCartModalOpen);
        setIsNavOpen(false); // Close the menu when opening the cart modal
    };

    useEffect(() => {
        setIsNavOpen(false);
        setIsCartModalOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 left-0 right-0 z-50 border-b backdrop-blur-lg mb-8">
            <section className="flex items-center justify-between px-4 sm:px-12 sm:mb-0 py-2">
                <div className="flex items-center gap-2">
                    <Link href={"/"}><span className="text-lg font-semibold">Projeto Carrinho</span></Link>
                </div>
                <div className="flex items-center gap-2 sm:gap-12">
                    <NavigationMenu>
                        <NavigationMenuList className="hidden sm:flex items-center gap-4">
                            {links.map((link, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        className="h-9 w-max rounded-md bg-gray-200 px-4 py-2 text-md font-medium hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                                        href={link.href}
                                    >
                                        {link.name}
                                        <span className="sr-only">Link para a página {link.name}</span>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                            {pathname != "/cart" ? (
                                <NavigationMenuItem>
                                    <Button variant="outline" className="h-9 w-max" onClick={handleCartModal}>
                                        {isCartModalOpen ? <X /> : <ShoppingCart />}
                                        <span className="sr-only">Link para a página do Carrinho</span>
                                    </Button>
                                </NavigationMenuItem>
                            ) : null}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Button
                        variant="outline"
                        className="p-2 sm:hidden"
                        onClick={handleNavOpen}
                        aria-label="Botão responsável por alternar a visibilidade do menu de navegação"
                    >
                        {isNavOpen ? <X /> : <Menu />}
                    </Button>
                    {pathname != "/cart" ? (
                        <Button
                            variant="outline"
                            className="p-2 sm:hidden"
                            onClick={handleCartModal}
                            aria-label="Botão responsável por alternar a visibilidade do menu de navegação"
                        >
                            {isCartModalOpen ? <X /> : <ShoppingCart />}
                        </Button>
                    ) : null}
                </div>
            </section>
            {isNavOpen && <MobileHeader />}
            {isCartModalOpen && <CartModal className="sm:w-[380px] w-11/12 mx-auto" />}
        </header>
    );
}

function MobileHeader() {
    return (
        <div className="sm:hidden flex flex-col gap-3 px-12 py-2 space-y-1">
            {links.map((link, index) => (
                <Link key={index} href={link.href} className="font-medium" aria-label="Link responsável por alterar a página">
                    {link.name}
                    <span className="sr-only">Link para a página {link.name}</span>
                </Link>
            ))}
        </div>
    );
}