import { User } from "@models";
import { connectToDB } from "@utils";

export const POST = async (request) => {
  const { id, techStack } = await request.json();

  try {
    await connectToDB();

    const user = await User.findById(id);
    if (!user) throw { status: 404, message: "User not found" };

    user.techStack = techStack;

    await user.save();

    return new Response(JSON.stringify({ message: "Tech Stack Updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
    });
  }
};
