import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getStudentPayments: (_req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createPayment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const processPayment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyPayment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const sendMassReminders: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=payments.controller.d.ts.map