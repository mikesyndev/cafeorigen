import { Button } from "@/components/buttons";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function SignUp(){
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const form = e.currentTarget;

        const body = {
            nombre: form.nombre.value,
            correo: form.correo.value,
            password: form.password.value,
            passwordConfirm: form.passwordConfirm.value,
        };

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error);
            return;
        }

        window.location.href = "/login/signIn";
    }

    return(
        <>
            <Header/>
            <div className="min-h-screen flex flex-col bg-white">
                <div className="relative h-48 md:h-56 overflow-hidden">
                    <div
                    className="absolute inset-0 bg-cover bg-center strip-top"
                    style={{ backgroundImage: "url('/el-cafe-adulto-cosechando.jpg')" }}
                    />
                    <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-primary mb-10">Registrarse</h1>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <form className="w-full max-w-md space-y-5 px-4"             
                        onSubmit={handleSubmit}>
                        <Input type="text" name="nombre" placeholder="Nombre completo" className="mb-4"/>
                        <Input type="email" name="correo" placeholder="Correo electronico" className="mb-4"/>
                        <Input type="password" name="password" placeholder="Contraseña" className="mb-4"/>
                        <Input type="password" name="passwordConfirm" placeholder="Confirmar contraseña" className="mb-4"/>
                        
                        {error && (
                            <p className="text-red-600 text-center">{error}</p>
                        )}
            
                        <Button type="submit"> Registrarse</Button>
                    </form>
                </div>

                <div className="relative h-40 md:h-52 mt-6 overflow-hidden">
                    <div
                    className="absolute inset-0 bg-cover bg-center strip-bottom"
                    style={{ backgroundImage: "url('/el-cafe-adulto-cosechando.jpg')" }}
                    />
                    <div className="relative h-full flex items-center justify-center">
                    </div>
                </div>
            </div>
        </>
    )
}