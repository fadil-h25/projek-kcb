import {
  findDosenByEmail,
  findManyDosen,
  findDosenById,
} from "../../src/Repositories/dosenRepo.js";

describe("Test findDosenByEmail", () => {
  test("should return dosen", async () => {
    const result = await findDosenByEmail("fatwa");
    expect(result).toBeTruthy();
  });
  test("should return null", async () => {
    const result = await findDosenByEmail("fatw");
    expect(result).toBeNull();
  });
});

describe("Test findDosenById", () => {
  test("should return dosen", async () => {
    const result = await findDosenById("b65c064f-9401-11ef-a6ee-d05f643ae4e4");
    console.log(result);

    expect(result).toBeTruthy();
  });
  test("should not return dosen but null", async () => {
    const result = await findDosenById("b65c064f-9401-11ef-a6ee-d05f643ae4");
    console.log(result);

    expect(result).toBeNull();
  });
});

describe("Test findManyDosen", () => {
  test("should return many dosen", async () => {
    const result = await findManyDosen();

    expect(result).not.toHaveLength(0);
  });
});
