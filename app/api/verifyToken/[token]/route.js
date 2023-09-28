import { NewUser } from "@models";
import { connectToDB } from "@utils";

export const GET = async (request, { params }) => {
  const { token } = params;

  try {
    await connectToDB();

    if (!token) throw { status: 400, message: "Missing fields" };

    const user = await NewUser.findOne({ token });

    if (!user) throw { status: 404, message: "Invalid token" };

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
    });
  }
};
