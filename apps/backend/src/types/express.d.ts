import "@clerk/express";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId?: string;
        sessionId?: string;
        getToken?: (opts?: { template?: string }) => Promise<string | null>;
      };
    }
  }
}
