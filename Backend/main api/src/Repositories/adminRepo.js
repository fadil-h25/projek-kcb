import prisma from "../Database/db.js";

const findAdminByEmail = async (email) => {
  const admin = prisma.admin.findUnique({
    where: {
      email,
    },
  });

  return admin;
};

const findAdminById = async (id) => {
  const admin = prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return admin;
};

const createAdmin = async (nama, email, password) => {
  const admin = prisma.admin.create({
    data: {
      nama,
      email,
      password,
    },
  });

  return admin;
};
export { findAdminByEmail, findAdminById, createAdmin };
