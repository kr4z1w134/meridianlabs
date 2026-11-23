import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/health") return next();

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  try {
    const { payload } = await jwtVerify(header.slice(7), secret, {
      issuer: "meridian",
      audience: "meridian-api",
    });
    (req as any).userId = payload.sub;
    (req as any).userRole = payload.role;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
