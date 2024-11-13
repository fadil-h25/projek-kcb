import { findManyDetailAbsenByAbsenId } from "../../src/Repositories/detailAbsen.js";

describe("test findManyDetailabsenByAbsenId", () => {
  test("should return data ", async () => {
    const result = await findManyDetailAbsenByAbsenId(
      "eef546e6-9402-11ef-a6ee-d05f643ae4e4"
    );

    console.log(result);
    expect(result).toBeTruthy();
  });

  test("should not return data dan have 0 length ", async () => {
    const result = await findManyDetailAbsenByAbsenId(
      "eef546e6-9402-11ef-a6ee-d05f643ae4e"
    );

    console.log(result);
    expect(result).toHaveLength(0);
  });
});
