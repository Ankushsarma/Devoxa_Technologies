import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export class AuthError extends Error {
    public status: number;
    constructor(message: string, status: number = 401) {
        super(message);
        this.status = status;
        this.name = 'AuthError';
    }
}

export function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Server configuration error: JWT_SECRET is not defined in environment variables.');
    }
    return secret;
}

export type NormalizedUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    chatId?: string;
};

export async function authStatus(): Promise<{ tokenStr?: string, decoded?: any }> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return { tokenStr: undefined };
    try {
        const decoded = jwt.verify(token, getJwtSecret());
        return { tokenStr: token, decoded };
    } catch {
        return { tokenStr: token };
    }
}

export async function requireAuth(): Promise<NormalizedUser> {
    const { decoded } = await authStatus();
    if (!decoded || !decoded.id) {
        throw new AuthError('Unauthorized', 401);
    }

    await connectToDatabase();
    const user = await User.findById(decoded.id).select('name email role chatId disabled').lean();

    if (!user) {
        throw new AuthError('User no longer exists', 401);
    }
    if (user.disabled) {
        throw new AuthError('Account is disabled', 403);
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        chatId: user.chatId,
    };
}

export async function requireAdmin(): Promise<NormalizedUser> {
    const user = await requireAuth();
    if (user.role !== 'admin') {
        throw new AuthError('Forbidden: Admin access required', 403);
    }
    return user;
}

export async function requireDeveloperOrAdmin(): Promise<NormalizedUser> {
    const user = await requireAuth();
    if (user.role !== 'admin' && user.role !== 'developer') {
        throw new AuthError('Forbidden: Developer or Admin access required', 403);
    }
    return user;
}

export async function requireClient(): Promise<NormalizedUser> {
    const user = await requireAuth();
    if (user.role !== 'client') {
        throw new AuthError('Forbidden: Client access required', 403);
    }
    return user;
}

export async function requireManager(): Promise<NormalizedUser> {
    const user = await requireAuth();
    if (user.role !== 'manager' && user.role !== 'admin') {
        throw new AuthError('Forbidden: Manager access required', 403);
    }
    return user;
}
