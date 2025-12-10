"use client";

import { CoffeeCard } from "@/components/card";
import { Header } from "@/components/header";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";

export default function cart(){
    const [quantity, setQuantity] = useState<number>(0);

    //funcion para multiplicar el precio por la cantidad seleccionada
    const multiplyPrice = (price: number, quantity: number) => {
        const total = price * quantity
        localStorage.setItem("total", total.toString());
        setQuantity(total);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
        const data = localStorage.getItem("user");

        //valida si hay datos de usuario, redirige a login si no hay
        if (!data) {
            try {
                window.location.href = "/login/signIn";
            } catch {
                window.location.href = "/";
            }
        }
        }
    }, []);

    return(
        <>
            <Header/>
            <div className="gap-4 flex w-full p-3">
                <CoffeeCard
                key="1"
                variant="horizontal"
                name="Café Molido 500g"
                description="Ideal para prensa francesa."
                price={30000}
                imageSrc="/cafe-ejemplo.jpg"
                buttonHref="/shop/checkout"
                />
                <Select onValueChange={(value) => {multiplyPrice(30000, parseInt(value))}}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona la cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Cantidad</SelectLabel>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-px bg-gray-300 my-4"></div>
            {/* total de la compra*/}
            <div className="flex justify-end pr-6 text-xl font-semibold">
                Total: $ {quantity}
            </div>
        </>
    )
}