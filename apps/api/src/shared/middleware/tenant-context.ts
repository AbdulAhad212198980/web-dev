import type { NextFunction, Request, Response } from "express";

export type TenantContext = {
  tenantId?: string;
  branchId?: string;
  requestId: string;
};

declare global {
  namespace Express {
    interface Request {
      tenantContext: TenantContext;
    }
  }
}

export const tenantContext = (req: Request, _res: Response, next: NextFunction) => {
  req.tenantContext = {
    tenantId: req.header("x-tenant-id") ?? req.params.tenantId,
    branchId: req.header("x-branch-id"),
    requestId: req.header("x-request-id") ?? crypto.randomUUID(),
  };
  next();
};
