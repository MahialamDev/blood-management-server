import db from "../../../../prisma/db";


const getAllUsers = async (page: number, limit: number, search?:string) => {
  const offset = (page - 1) * limit;
  const users = await db.orm.public.User.select(
    "id",
    "name",
    "email",
    "role",
    "imageUrl",
    "createdAt",
    "updatedAt",
  )
    .limit(limit)
    .offset(offset)
    .all();

  const result = await db.orm.public.User.aggregate((a) => ({
    total: a.count(),
  }));
  const total = Number(result.total);
  return {
    users,
    total,
    page,
    limit,
    totalPage: Math.ceil(total / limit),
  };
};

export const UserService = { getAllUsers };
