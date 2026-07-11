import type { NextFunction, Request, RequestHandler, Response } from "express";

// Express 4 does not forward rejected promises from async handlers to
// error middleware on its own, an unhandled rejection here would hang the
// request instead of returning a 500. Wrap every async route with this.
export function asyncHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
