"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = ({ params }) => {
  const { data: session } = useSession();
  const { id } = params;
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [techStackInput, setTechStackInput] = useState("");

  const handleEdit = async (id, techStack) => {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        id,
        techStack,
      }),
    };

    const response = await fetch("/api/techStack", fetchOptions);
    const data = await response.json();

    setTechStackInput(techStack);
    profile.techStack = techStack;

    if (response.status === 200) {
      toast.success(data.message);
      setToggleEdit(false);
    } else toast.error(data.message);
  };

  const fetchProfile = async () => {
    const fetchOptions = {
      method: "GET",
    };
    const response = await fetch(`/api/user?id=${id}`, fetchOptions);
    const data = await response.json();

    if (response.status === 200) setProfile(data);
    else {
      toast.error(data.message);
      router.push("/");
    }
    setTechStackInput(data.techStack);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="w-screen h-auto p-4 text-sm">
      {!profile ? (
        <h1 className="my-5 text-3xl font-extrabold leading-[1.15] sm:text-5xl">
          Loading Profile
        </h1>
      ) : (
        <>
          <h1 className="mt-5 mb-4 text-3xl font-extrabold leading-[1.15] sm:text-5xl">
            {profile.name}
          </h1>
          <h2 className="mb-2 text-lg font-semibold leading-[1.15]">
            {(profile.domain === "web" && "Web Dev") ||
              (profile.domain === "app" && "App Dev") ||
              (profile.domain === "aiml" && "AI-ML")}
          </h2>
          <h2 className="mb-5 text-base font-semibold leading-[1.15]">
            {profile.designation.charAt(0).toUpperCase() +
              profile.designation.slice(1)}
          </h2>
          <h2 className="my-5 text-base font-semibold leading-[1.15] cursor-pointer">
            <a
              href={`mailto:${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.email}
            </a>
          </h2>
          <h4 className="my-5 mb-2 text-xl font-semibold leading-[1.15] underline flex items-center">
            Tech Stack Details
            {session?.user?.email === profile?.email && (
              <p
                className="text-white h-4 w-4 m-2 cursor-pointer"
                onClick={() => setToggleEdit(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  id="Edit"
                >
                  <path
                    d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"
                    fill="#ffffff"
                    class="color000000 svgShape"
                  ></path>
                  <path
                    d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"
                    fill="#ffffff"
                    class="color000000 svgShape"
                  ></path>
                </svg>
              </p>
            )}
          </h4>
          <p className="mt-2 text-sm leading-[1.15]">{profile.techStack}</p>
          {toggleEdit && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50`}
            >
              <div
                className="fixed inset-0 bg-black opacity-50 text-white"
                onClick={() => setToggleEdit(false)}
              ></div>
              <div className="bg-[#1f2937] p-4 rounded shadow-lg z-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit(profile._id, techStackInput);
                  }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Edit Tech Stack
                  </h2>
                  <textarea
                    className="w-full h-32 p-2 border rounded-md resize-none bg-black"
                    placeholder="Enter text here..."
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                  ></textarea>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setToggleEdit(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <h3 className="mt-5 mb-2 text-sm font-semibold leading-[1.15] cursor-pointer text-blue-500">
            <a
              href={`${profile.gitub}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.github}
            </a>
          </h3>
          <h3 className="mb-5 mt-2 text-sm font-semibold leading-[1.15] cursor-pointer text-blue-500">
            <a
              href={`${profile.gitub}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.linkedin}
            </a>
          </h3>
          <p>
            {profile.year === 1 && (
              <span>
                1<sup>st</sup> Year
              </span>
            )}
            {profile.year === 2 && (
              <span>
                2<sup>nd</sup> Year
              </span>
            )}
            {profile.year === 3 && (
              <span>
                3<sup>rd</sup> Year
              </span>
            )}
            {profile.year === 4 && (
              <span>
                4<sup>th</sup> Year
              </span>
            )}
          </p>
          <p className="mt-2 mb-5">{profile.department}</p>
        </>
      )}
    </div>
  );
};
export default Profile;
