import {
  findMahasiswaById,
  findMahasiswaByNim,
  findManyMahasiswa,
} from "../../src/Repositories/mahasiswaRepo.js";

describe("Test findMahasiswaById", () => {
  test("should return mahasiswa", async () => {
    const mahasiswa = await findMahasiswaById(
      "cf1a17c4-9402-11ef-a6ee-d05f643ae4e4"
    );
    expect(mahasiswa).toBeTruthy();
  });

  test("should not return mahasiswa but null", async () => {
    const mahasiswa = await findMahasiswaById(
      "cf1a17c4-9402-11ef-a6ee-d05f643a"
    );
    expect(mahasiswa).toBeNull();
  });
});

describe("Test findMahasiswaByNim", () => {
  test("should return mahasiswa", async () => {
    const mahasiswa = await findMahasiswaByNim("fadil");
    expect(mahasiswa).toBeTruthy();
  });

  test("should not return mahasiswa but null", async () => {
    const mahasiswa = await findMahasiswaByNim("fadi");
    expect(mahasiswa).toBeNull();
  });
});

describe("Test findManyMahasiswa", () => {
  test("should return mahasiswa", async () => {
    const mahasiswa = await findManyMahasiswa();
    expect(mahasiswa).toBeTruthy();
  });
});
