import { Header } from "@/components/header";
import { Button } from "@/components/buttons";
import { useEffect } from "react";

export default function PurchaseSuccess() {

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("total");
        }
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center border border-zinc-200 animate-in fade-in zoom-in duration-700">

                    <h1 className="text-3xl font-bold text-green-600 mb-2">
                        ¡Compra exitosa!
                    </h1>

                    <p className="text-zinc-700 mb-6 text-sm md:text-base">
                        Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.
                        Te notificaremos por correo cuando esté listo para enviarse.
                    </p>

                    <div className="bg-zinc-100 p-3 rounded-lg text-sm mb-6 border border-zinc-300">
                        Número de orden: <span className="font-semibold">#124578</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Button href="/" className="px-8">
                        Ir al inicio
                        </Button>

                        <Button href="/" className="px-8">
                        Ver mis pedidos
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
