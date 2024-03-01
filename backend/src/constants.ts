import { config } from "dotenv";

config({ path: ".env" });

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT ?? "4000", 10);

export const CORS_ALLOW_ORIGINS = [
  process.env.EXPLORER_URL ?? "",
  process.env.UI_URL ?? "",
];
