import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
/**
 * Login user
 * POST /api/auth/login
 */
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Register new user
 * POST /api/auth/register
 */
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get current user
 * GET /api/auth/me
 */
export declare const getCurrentUser: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get student profile (joined info)
 * GET /api/auth/student/profile
 */
export declare const getStudentProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Logout user
 * POST /api/auth/logout
 */
export declare const logout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export declare const refreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map