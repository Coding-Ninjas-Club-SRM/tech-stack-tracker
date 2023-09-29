import { NewUser, User } from "@models";
import { connectToDB } from "@utils";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const {
    token,
    name,
    email,
    password,
    year,
    department,
    domain,
    techStack,
    designation,
  } = await request.json();

  try {
    console.log(
      token,
      name,
      email,
      password,
      year,
      department,
      domain,
      techStack,
      designation,
    );
    if (
      !token ||
      !name ||
      !email ||
      !password ||
      !year ||
      !department ||
      !domain ||
      !techStack ||
      !designation
    )
      throw { status: 400, message: "Missing fields" };

    await connectToDB();

    await NewUser.findOneAndDelete({ token });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      year,
      department,
      domain,
      techStack,
      designation,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "Registered Successfully", newUser }),
      {
        status: 201,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
    });
  }
};
