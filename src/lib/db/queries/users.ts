import { getDb } from "../index";
import bcrypt from "bcryptjs";

export type NewUser = {
    nombre: string;
    correo: string;
    passwordHash: string;
    rol?: string;
};

export type UserRow = { 
    correo: string;
    password: string; 
};

type DbUserRow = {
    id_usuario: number;
    nombre: string;
    rol: string;
    password_hash: string;
};

export async function createUser({
    nombre,
    correo,
    passwordHash,
    rol = "consumidor",
}: NewUser): Promise<{ id_usuario: number }> {
    const db = getDb();

    return new Promise((resolve, reject) => {
        db.run(
        `INSERT INTO usuarios (nombre, correo, password_hash, rol)
        VALUES (?, ?, ?, ?)`,
        [nombre, correo, passwordHash, rol],
        function (err) {
            if (err) return reject(err);
            resolve({ id_usuario: this.lastID });
        }
        );
    });
}

export async function login({
    correo,
    password,
}: UserRow): Promise<{ id_usuario: number; nombre: string; rol: string }> {
    const db = getDb();

    return new Promise((resolve, reject) => {
        db.get<DbUserRow>(
        `SELECT id_usuario, nombre, rol, password_hash 
        FROM usuarios 
        WHERE correo = ?`,
        [correo],
        async (err, row) => {
            if (err) return reject(err);

            // Usuario no encontrado
            if (!row) {
            return reject(new Error("Usuario no encontrado"));
            }

            // Validar contraseña
            const passwordCorrecta = await bcrypt.compare(password, row.password_hash);

            if (!passwordCorrecta) {
            return reject(new Error("Contraseña incorrecta"));
            }

            // Login exitoso
            resolve({
            id_usuario: row.id_usuario,
            nombre: row.nombre,
            rol: row.rol,
            });
        }
        );
    });
}
