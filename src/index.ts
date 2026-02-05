import { createMiddleware } from "hono/factory";
import { convertObjectKeysToCamelCase } from "./lib.js";

export const enforceCamelCase = createMiddleware(async (c, next) => {
  await next();

  const response = await c.res.json();

  c.res = new Response(JSON.stringify(convertObjectKeysToCamelCase(response)), {
    headers: c.res.headers,
    status: c.res.status,
  });
});
