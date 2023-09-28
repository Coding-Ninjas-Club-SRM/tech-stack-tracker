"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, designation } = data;

    try {
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
          email,
          designation,
        }),
      };
      const response = await fetch("/api/addUser", fetchOptions);
      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        router.push("/");
      } else if (response.status === 409) {
        toast.warn(data.message);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen p-4">
      <h1 className="my-5 text-3xl font-extrabold leading-[1.15] sm:text-5xl">
        Add User
      </h1>
      <div className="w-full flex justify-center items-center">
        <form className="w-[50%]" onSubmit={handleSubmit(onSubmit)}>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              {...register("email")}
            />
          </div>

          <div class="mb-6">
            <label
              for="designation"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Designation
            </label>
            <select
              id="designation"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("designation")}
            >
              <option>Member</option>
              <option>Associate</option>
              <option>Head</option>
              <option>Board</option>
            </select>
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddUser;
