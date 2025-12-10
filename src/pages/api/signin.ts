import { login } from "@/lib/db/queries/users";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { correo, password} = req.body as {
        correo?: string;
        password?: string;
        };

        if (!correo || !password) {
        return res
            .status(400)
            .json({ error: "Faltan campos obligatorios (correo, password)" });
        }

        const user = await login({ correo, password });

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (err: any) {
        console.error("Error en el inicio de sesión:", err);

        if (err.message === "Usuario no encontrado" || err.message === "Contraseña incorrecta") {
        return res.status(401).json({ error: err.message });
        }

        return res.status(500).json({ error: "Error interno del servidor" });
    }
}