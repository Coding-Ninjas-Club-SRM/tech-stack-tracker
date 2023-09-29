import { User } from "@models";
import { connectToDB } from "@utils";

export const revalidate = 1;
export const GET = async (request) => {
  try {
    await connectToDB();

    const result = await User.find({});
    if (!result) throw { status: 404, message: "No users found" };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
};
