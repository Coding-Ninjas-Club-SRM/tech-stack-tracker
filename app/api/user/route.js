import { User } from "@models";
import { connectToDB } from "@utils";

export const revalidate = 1;
export const GET = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const email = url.searchParams.get("email");
  try {
    await connectToDB();

    let result;
    if (id) result = await User.findById(id);
    else if (email) result = await User.findOne({ email });
    else result = await User.find({});
    if (!result) throw { status: 404, message: "No user found" };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
};

export const PATCH = async (request) => {
  const { id, github, linkedin } = await request.json();

  try {
    await connectToDB();

    if ((!github && !linkedin) || !id)
      throw { status: 400, message: "No data provided" };

    const user = await User.findById(id);
    if (!user) throw { status: 404, message: "User not found" };

    if (github) user.github = github;
    if (linkedin) user.linkedin = linkedin;

    await user.save();

    return new Response(JSON.stringify({ message: "User updated" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
};
