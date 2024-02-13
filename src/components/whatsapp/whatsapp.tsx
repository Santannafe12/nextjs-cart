"use client"

import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { CartContext } from "@/context/cart";

const baseMessage = "Olá, gostaria de fazer um pedido e solicitar um orçamento sobre os seguinte(s) produto(s)! Obrigado(a).";

export default function WhatsApp() {
    const { cartItems } = useContext(CartContext)!;

    let messageURI = baseMessage;

    cartItems.forEach((item, index) => {
        messageURI += `\n\nProduto ${index}: ${item.product.name}\nQuantidade: ${item.quantity}`;
    });

    const whatsappLink = `https://wa.me/5524992382730?text=${encodeURIComponent(
        messageURI
    )}`;

    window.open(whatsappLink, "_blank");

    const GenerateURIWhatsApp = (phone: string) => {
        const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
            messageURI
        )}`;

        window.open(whatsappLink, "_blank");
    }

    return (
        <div>
            <Button className="flex gap-2 items-center bg-green-600 text-white hover:bg-green-700 select-none" onClick={() => GenerateURIWhatsApp("5524992382730")}><Phone /> Entrar em Contato!</Button>
        </div>
    )
}