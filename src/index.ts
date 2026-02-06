import { createMiddleware } from "hono/factory";
import { convertObjectKeysToCamelCase } from "./lib.js";

export const enforceCamelCase = createMiddleware(async (c, next) => {
  await next();

  const response = await c.res.json();

  c.res = new Response(
    c.res.status !== 204
      ? JSON.stringify(convertObjectKeysToCamelCase(response))
      : null,
    {
      headers: c.res.headers,
      status: c.res.status,
    },
  );
});
