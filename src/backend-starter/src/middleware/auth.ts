import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend Express Request type
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
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_jwt_secret'
    );
    if (typeof verified === 'string') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.'
      });
    }
    const decoded = verified as JwtPayload & {
      id: number;
      email: string;
      role: string;
    };

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    return next();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please login again.'
    });
  }
};

/**
 * Middleware to authorize based on roles
 * Usage: authorize('super_admin', 'admin_unit')
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please login first.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to access this resource.'
      });
    }

    return next();
  };
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const verified = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_jwt_secret'
      );
      if (typeof verified !== 'string') {
        const decoded = verified as JwtPayload & {
          id: number;
          email: string;
          role: string;
        };

        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
        };
      }
    }

    return next();
  } catch (error) {
    // Ignore errors, just proceed without user
    return next();
  }
};

export const requireCsrf = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerToken = (req.headers['x-csrf-token'] as string) || '';
    const cookieReq = req as Request & { cookies?: Record<string, string> };
    const cookies = cookieReq.cookies || {};
    const cookieToken = cookies['csrf_token'] || '';
    if (!headerToken || !cookieToken || headerToken !== cookieToken) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. CSRF token invalid or missing.'
      });
    }
    return next();
  } catch {
    return res.status(403).json({ success: false, message: 'Forbidden.' });
  }
};
