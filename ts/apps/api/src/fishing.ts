import { Elysia } from "elysia";

export const fishing = new Elysia().get("/fishing", () => "Hello Fishing");
