"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = ({ params }) => {
  const [fetching, setFetching] = useState(true);
  const [email, setEmail] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [domain, setDomain] = useState(null);

  console.log(params);
  const token = params.token;

  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const fetchOptions = {
        method: "GET",
      };
      const response = await fetch(`/api/verifyToken/${token}`, fetchOptions);
      const data = await response.json();
      if (response.status === 404) {
        toast.error(data.message);
        router.push("/");
      }
      setFetching(false);
      setEmail(data.email);
      setDesignation(data.designation);
      setDomain(data.domain);
    };

    verify();
  }, [token]);

  const onSubmit = async (data) => {
    const { name, password, year, department, techStack } = data;

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        token,
        name,
        email,
        password,
        year,
        department,
        domain,
        techStack,
        designation,
      }),
    };
    const response = await fetch("/api/register", fetchOptions);
    const responseData = await response.json();

    if (response.status === 201) {
      toast.success(responseData.message);
      router.push("/");
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="w-screen h-screen p-4">
      {fetching ? (
        <h1 className="my-5 text-3xl font-extrabold leading-[1.15] sm:text-5xl">
          Verifying Token
        </h1>
      ) : (
        <>
          <h1 className="my-5 text-3xl font-extrabold leading-[1.15] sm:text-5xl">
            Register
          </h1>

          <div className="flex justify-center items-center">
            <form className="w-[50%]" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-default"
                  required
                  {...register("name")}
                />
              </div>

              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-default"
                  value={email}
                  disabled
                  required
                  {...register("email")}
                />
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input-default"
                    required
                    {...register("password", {
                      required: true,
                      validate: (value) => {
                        if (value.length < 8)
                          return toast.error(
                            "Password must be at least 8 characters long",
                          );
                        let regex =
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*0-9]).+$/;
                        if (!regex.test(value))
                          return toast.error(
                            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                          );
                      },
                    })}
                  />
                </div>

                <div className="mb-6">
                  <label
                    for="repassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    id="repassword"
                    className="input-default"
                    required
                    {...register("repassword", {
                      required: true,
                      validate: (value) => {
                        if (watch("password") !== value)
                          return toast.error("Passwords don't match");
                      },
                    })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  for="year"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Year
                </label>
                <select
                  id="year"
                  className="input-default"
                  {...register("year")}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  for="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  className="input-default"
                  required
                  {...register("department")}
                />
              </div>

              <div className="mb-6">
                <label
                  for="domain"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Designation
                </label>
                <select
                  id="domain"
                  className="input-default"
                  disabled
                  {...register("domain")}
                >
                  <option selected hidden>
                    {domain === "web" && "Web Development"}
                    {domain === "app" && "App Development"}
                    {domain === "aiml" && "AI-ML"}
                    {domain === "cp" && "Competitive Programming"}
                  </option>
                  <option>Member</option>
                  <option>Associate</option>
                  <option>Head</option>
                  <option>Board</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  for="techstack"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tech Stack
                </label>
                <textarea
                  id="techstack"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="You tech stack..."
                  {...register("techStack")}
                />
              </div>

              <div className="mb-6">
                <label
                  for="designation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Designation
                </label>
                <select
                  id="designation"
                  className="input-default"
                  disabled
                  {...register("designation")}
                >
                  <option selected hidden>
                    {designation.charAt(0).toUpperCase() + designation.slice(1)}
                  </option>
                  <option>Member</option>
                  <option>Associate</option>
                  <option>Head</option>
                  <option>Board</option>
                </select>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default Register;
