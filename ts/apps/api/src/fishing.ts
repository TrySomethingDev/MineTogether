import { Elysia, t } from "elysia";
import { Type, type Static } from "@sinclair/typebox";
import { db, schema as dbSchema } from "@packages/db";
import { nanoid } from "nanoid";

const StringEnum = <T extends string[]>(values: [...T]) =>
  Type.Unsafe<T[number]>({
    type: "string",
    enum: values,
  });

const facingEnum = {
  north: "north",
  south: "south",
  east: "east",
  west: "west",
} as const;

type FacingEnum = "north" | "south" | "east" | "west";

const schema = Type.Object({
  facing: Type.String({ enum: facingEnum }),
  location: Type.Object({
    x: Type.Integer(),
    y: Type.Integer(),
    z: Type.Integer(),
  }),
});

type Schema = Static<typeof schema>;

export const fishing = new Elysia({ prefix: "/fishing" }).post(
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
);
