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
          <h4 className="my-5 mb-2 text-xl font-semibold leading-[1.15] underline">
            Tech Stack Details
          </h4>
          <p className="mt-2 text-sm leading-[1.15]">{profile.techStack}</p>
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
