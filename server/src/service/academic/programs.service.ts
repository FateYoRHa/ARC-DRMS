import { programs } from "../../database/schema";
import { db } from "../../database/db";
import {
  NewProgram,
  UpdateProgramInput,
} from "../../validators/api/program.validator";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export async function createProgramService(program: NewProgram) {
  const newProgram = await db.insert(programs).values(program).returning();
  return newProgram[0];
}

export async function updateProgramService(
  id: number,
  program: UpdateProgramInput,
) {
  const updatedProgram = await db
    .update(programs)
    .set(program)
    .where(eq(programs.id, id))
    .returning();
  return updatedProgram[0];
}
