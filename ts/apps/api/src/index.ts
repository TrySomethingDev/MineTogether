import "@bogeychan/elysia-polyfills/node/index.js";

import { Elysia } from "elysia";
import { fishing } from "./fishing";
import { swagger } from "@elysiajs/swagger";

new Elysia()
  .use(fishing)
  .use(swagger())
  .get("/", () => {
    return {
      "swagger (api docs)": "/swagger",
      fishing: "/fishing",
    };
  })
  .listen(3000);
