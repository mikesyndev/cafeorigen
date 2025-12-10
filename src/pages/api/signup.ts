import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/lib/db/queries/users";
import bcrypt from "bcryptjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { nombre, correo, password, passwordConfirm } = req.body as {
        nombre?: string;
        correo?: string;
        password?: string;
        passwordConfirm?: string;
        };

        if (!nombre || !correo || !password) {
        return res
            .status(400)
            .json({ error: "Faltan campos obligatorios (nombre, correo, password)" });
        }

        if (password !== passwordConfirm) {
        return res
            .status(400)
            .json({ error: "Las contraseñas no coinciden" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await createUser({ nombre, correo, passwordHash });

        // Redirige al login después de registrarse
        res.writeHead(302, { Location: "/login/signIn" });
        res.end();
    } catch (err: any) {
        console.error("Error creando usuario:", err);

        if (err.message?.includes("UNIQUE")) {
        return res.status(400).json({ error: "Ya existe un usuario con ese correo" });
        }

        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
