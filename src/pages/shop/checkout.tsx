import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/buttons";
import { Input } from "@/components/ui/input";

type PaymentMethod = "card" | "cash" | "transfer" | "other";

export default function CheckoutConfirm() {
    const [total, setTotal] = useState<number>(0);
    const [method, setMethod] = useState<PaymentMethod>("card");

    const formatCurrency = (value: number) =>
        value.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTotal = localStorage.getItem("total");
            if (storedTotal) {
                setTotal(parseInt(storedTotal));
            }
        }
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen flex justify-center items-start bg-zinc-50 py-8">
                <div className="w-full max-w-5xl bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6 md:p-8">
                            {/* metodos de pago */}
                            <div className="flex gap-4 border-b pb-4 mb-6 text-sm md:text-base">
                                <button
                                type="button"
                                onClick={() => setMethod("card")}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 border transition 
                                    ${
                                    method === "card"
                                        ? "bg-purple-300 text-white border-purple-400"
                                        : "border-transparent hover:bg-zinc-100"
                                    }`}
                                >
                                <span>💳</span>
                                <span>Tarjeta</span>
                                </button>

                                <button
                                type="button"
                                onClick={() => setMethod("cash")}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 border transition 
                                    ${
                                    method === "cash"
                                        ? "bg-purple-300 text-white border-purple-400"
                                        : "border-transparent hover:bg-zinc-100"
                                    }`}
                                >
                                <span>💵</span>
                                <span>Efectivo</span>
                                </button>

                                <button
                                type="button"
                                onClick={() => setMethod("transfer")}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 border transition 
                                    ${
                                    method === "transfer"
                                        ? "bg-purple-300 text-white border-purple-400"
                                        : "border-transparent hover:bg-zinc-100"
                                    }`}
                                >
                                <span>🔗</span>
                                <span>Transferencia</span>
                                </button>

                                <button
                                type="button"
                                onClick={() => setMethod("other")}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 border transition 
                                    ${
                                    method === "other"
                                        ? "bg-purple-300 text-white border-purple-400"
                                        : "border-transparent hover:bg-zinc-100"
                                    }`}
                                >
                                <span>➕</span>
                                <span>Más</span>
                                </button>
                            </div>

                            {/* formularios de cada metodo */}
                            {method === "card" && (
                                <form className="space-y-4 max-w-md">
                                    <Input
                                        type="text"
                                        name="nombreTitular"
                                        placeholder="Nombre titular"
                                    />
                                    <Input
                                        type="text"
                                        name="apellidoTitular"
                                        placeholder="Apellido titular"
                                    />
                                    <Input
                                        type="text"
                                        name="numeroTarjeta"
                                        placeholder="Número tarjeta"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input type="text" name="fecha" placeholder="Fecha" />
                                        <Input type="text" name="cvv" placeholder="CVV" />
                                    </div>

                                    <div className="pt-6">
                                        <Button className="px-10" href="/shop/success" variant={"color"}>
                                            Comprar
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {method === "cash" && (
                                <div className="text-sm text-zinc-700 space-y-2">
                                <p>
                                    Puedes pagar en efectivo contra entrega. Te enviaremos los
                                    detalles de la orden a tu correo.
                                </p>
                                </div>
                            )}

                            {method === "transfer" && (
                                <div className="text-sm text-zinc-700 space-y-2">
                                <p>
                                    Realiza la transferencia a la cuenta bancaria indicada y
                                    sube el comprobante en el siguiente paso.
                                </p>
                                </div>
                            )}

                            {method === "other" && (
                                <div className="text-sm text-zinc-700 space-y-2">
                                <p>Otros métodos de pago disponibles próximamente.</p>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-80 bg-purple-100 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l px-6 py-10">
                            <div className="w-full border-b border-zinc-300 mb-8" />
                            <div className="text-center space-y-3">
                                <p className="text-lg md:text-xl font-medium">
                                Total a pagar
                                </p>
                                <p className="text-3xl md:text-4xl font-bold">
                                {formatCurrency(total)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
