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

export async function retrieveAllProgramsService() {
  return await db.select().from(programs);
}

export async function retrieveProgramByIdService(id: number) {
  const program = await db.select().from(programs).where(eq(programs.id, id));
  return program[0];
}
