import { Request, Response } from 'express';

export const getReport = async (_req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    if (isDev) {
      const report = {
        totalRevenue: 7500000,
        totalPending: 3000000,
        totalOverdue: 0,
        overdueCount: 2,
        paidCount: 5,
        pendingCount: 2,
        byUnit: [
          { unit: 'SMAIT', revenue: 2000000 },
          { unit: 'SMPIT', revenue: 1500000 },
          { unit: 'SDIT', revenue: 2500000 },
          { unit: 'TKIT', revenue: 1000000 },
          { unit: 'SLBIT', revenue: 500000 }
        ]
      };
      return res.json({ success: true, data: report });
    }
    return res.json({ success: true, data: {} });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to get report' });
  }
};
