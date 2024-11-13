import { findManyAbsenByDosenId } from "../../src/Repositories/absenRepo.js";

describe("test findManyAbsenByDosenId", () => {
  test("should return many data", async () => {
    const result = await findManyAbsenByDosenId(
      "b65c064f-9401-11ef-a6ee-d05f643ae4e4"
    );

    expect(result).not.toHaveLength(0);
  });
  test("should return not many data or return []", async () => {
    const result = await findManyAbsenByDosenId(
      "b65c064f-9401-11ef-a6ee-d05f643ae4e"
    );

    expect(result).toHaveLength(0);
  });
});
