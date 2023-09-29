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
