import { Button } from "@/components/buttons";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { useState } from "react";

export default function SignIn(){
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const body = {
            correo: form.correo.value,
            password: form.password.value,
        };
        const res = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();

        if (!res.ok) {
        setError(data.error);
        return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/";
    }

    return(
        <>
            <Header/>
            <div className="w-full h-screen flex relative bg-white overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-[65%] clip-diagonal shadow-2xl">
                    <Image
                    src="/manos-que-estan-recogiendo-granos-de-cafe-del-arbol-de-cafe.jpg"
                    alt="Café"
                    fill
                    priority
                    className="object-cover"
                    />
                </div>

                <div className="relative z-10 w-[45%] flex flex-col justify-center items-center px-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-10">Iniciar sesion</h1>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" name="correo" placeholder="Correo electronico" className="mb-4"/>
                        <Input type="password" name="password" placeholder="Contraseña" className="mb-4"/>

                        {error && (
                            <p className="text-red-600 text-center">{error}</p>
                        )}

                        <Button> Ingresar</Button>
                    </form>
                </div>
            </div>
        </>
    )
}