"use client";

import { CartContext } from "@/context/cart";
import { useContext } from "react";

const baseMessage = "Olá, gostaria de fazer um pedido. \n\n";

export function openWhatsApp(message: string, phone: string) {
  const whatsappLink = `https://wa.me/5524992382730?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappLink, "_blank");
}

export function GenerateURIWhatsApp(phone: string) {
  const { cartItems } = useContext(CartContext)!;

  let messageURI = baseMessage;

  cartItems.forEach((item) => {
    messageURI += `\n\nProduct: ${item.product.name}\nQuantity: ${item.quantity}`;
  });

  const phoneURI = "5524992382730"; // phone

  const whatsappLink = `https://wa.me/5524992382730?text=${encodeURIComponent(
    messageURI
  )}`;
  
  window.open(whatsappLink, "_blank");
}
