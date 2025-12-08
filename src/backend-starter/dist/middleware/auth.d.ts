import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}
/**
 * Middleware to authenticate JWT token
 */
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
/**
 * Middleware to authorize based on roles
 * Usage: authorize('super_admin', 'admin_unit')
 */
export declare const authorize: (...allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
/**
 * Optional authentication - doesn't fail if no token
 */
export declare const optionalAuth: (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map