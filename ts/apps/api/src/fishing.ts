import { Elysia, t } from "elysia";
import { Type, type Static, TSchema } from "@sinclair/typebox";
import { db, schema as dbSchema } from "@packages/db";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

const StringEnum = <T extends string[]>(values: [...T]) =>
  Type.Unsafe<T[number]>({
    type: "string",
    enum: values,
  });

const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

const facingEnum = {
  north: "north",
  south: "south",
  east: "east",
  west: "west",
} as const;

type FacingEnum = "north" | "south" | "east" | "west";

const schema = Type.Object({
  facing: Type.String({ enum: facingEnum, default: "north" }),
  location: Type.Object({
    x: Type.Integer(),
    y: Type.Integer(),
    z: Type.Integer(),
  }),
});

type Schema = Static<typeof schema>;

export const fishing = new Elysia({ prefix: "/fishing" })
  .post(
    "/createSpawnPoint",
    async ({ body }: { body: Schema }) => {
      const data = {
        locationX: 2,
        locationY: 2,
        locationZ: 2,
        facing: body.facing as FacingEnum,
        isOccupied: false,
        occupantId: null,
        id: nanoid(),
      };

      await db.insert(dbSchema.fishingSpots).values(data);

      return {
        status: "success",
        data: data,
      };
    },
    {
      body: schema,
    },
  )
  .post(
    "/deleteSpawnPoint",
    async ({ body }: { body: { id: string } }) => {
      await db
        .delete(dbSchema.fishingSpots)
        .where(eq(dbSchema.fishingSpots.id, body.id));

      return {
        status: "success",
        deletedId: body.id,
      };
    },
    {
      body: Type.Object({
        id: Type.String(),
      }),
    },
  )
  .get(
    "/getSpawnPoints",
    () => {
      return db.query.fishingSpots.findMany();
    },
    {
      response: Type.Array(
        Type.Object({
          id: Type.String(),
          isOccupied: Type.Boolean({ default: false }),
          occupantId: Nullable(Type.String()),
          locationX: Type.Integer(),
          locationY: Type.Integer(),
          locationZ: Type.Integer(),
        }),
      ),
    },
  )
  .get(
    "/users",
    () => {
      return db.query.users.findMany();
    },
    {
      response: Type.Array(
        Type.Object({
          id: Type.String(),
          name: Type.String(),
          minecraftName: Nullable(Type.String()),
          minecraftUUID: Nullable(Type.String()),
        }),
      ),
    },
  );
