"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Modal = ({
  setToggleModal,
  textArea,
  setTextArea,
  handleEdit,
  title,
}) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50`}>
      <div
        className="fixed inset-0 bg-black opacity-50 text-white"
        onClick={() => setToggleModel(false)}
      ></div>
      <div className="bg-[#1f2937] p-4 rounded shadow-lg z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(textArea);
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Edit {title}</h2>
          <textarea
            className="w-full h-32 p-2 border rounded-md resize-none bg-black"
            placeholder="Enter text here..."
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          ></textarea>
          <div className="mt-4 flex justify-between items-center">
            <button
              type="reset"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setToggleModal(false)}
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
  );
};

const Profile = ({ params }) => {
  const { data: session } = useSession();
  const { id } = params;
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const [toggleModal, setToggleModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [textArea, setTextArea] = useState("");

  const setModal = (value) => {
    console.log(value);
    setToggleModal(value);
    setModalType("");
  };

  const handleEdit = async (techStack) => {
    const id = profile?._id;
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        id,
        techStack,
      }),
    };

    const response = await fetch("/api/techStack", fetchOptions);
    const data = await response.json();

    if (response.status === 200) {
      toast.success(data.message);
      profile.techStack = techStack;
      setModalType("");
    } else toast.error(data.message);

    setToggleModal(false);
  };

  const handleEditGithub = async (github) => {
    const id = profile?._id;
    const fetchOptions = {
      method: "PATCH",
      body: JSON.stringify({
        id,
        github,
      }),
    };
    const response = await fetch("/api/user", fetchOptions);
    const data = await response.json();

    if (response.status === 200) {
      toast.success("Github Profile Updated");
      profile.github = github;
      setModalType("");
    } else toast.error(data.message);

    setToggleModal(false);
  };

  const handleEditLinkedin = async (linkedin) => {
    const id = profile?._id;
    const fetchOptions = {
      method: "PATCH",
      body: JSON.stringify({
        id,
        linkedin,
      }),
    };
    const response = await fetch("/api/user", fetchOptions);
    const data = await response.json();

    if (response.status === 200) {
      toast.success("LinkedIn Profile Updated");
      profile.linkedin = linkedin;
      setModalType("");
    } else toast.error(data.message);

    setToggleModal(false);
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
          {session?.user?.email === profile?.email && (
            <div className="flex gap-4 items-center flex-wrap">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setModalType("techStack");
                  setToggleModal(true);
                  setTextArea(profile.techStack);
                }}
              >
                Edit Tech Stack
              </button>
              {modalType === "techStack" && toggleModal && (
                <Modal
                  setToggleModal={setModal}
                  textArea={textArea}
                  setTextArea={setTextArea}
                  title="Tech Stack"
                  handleEdit={handleEdit}
                />
              )}

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setModalType("github");
                  setToggleModal(true);
                  setTextArea(profile.github);
                }}
              >
                Edit Github Profile
              </button>
              {modalType === "github" && toggleModal && (
                <Modal
                  setToggleModal={setModal}
                  textArea={textArea}
                  setTextArea={setTextArea}
                  title="Github Profile"
                  handleEdit={handleEditGithub}
                />
              )}

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setModalType("linkedin");
                  setToggleModal(true);
                  setTextArea(profile.linkedin);
                }}
              >
                Edit LinkedIn Profile
              </button>
              {modalType === "linkedin" && toggleModal && (
                <Modal
                  setToggleModal={setModal}
                  textArea={textArea}
                  setTextArea={setTextArea}
                  title="LinkedIn Profile"
                  handleEdit={handleEditLinkedin}
                />
              )}
            </div>
          )}
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
          </h4>
          <p className="mt-2 text-sm leading-[1.15]">{profile.techStack}</p>
          {profile.github && (
            <h3 className="mt-5 mb-2 text-sm font-semibold leading-[1.15] cursor-pointer text-blue-500">
              <a
                href={profile?.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.github}
              </a>
            </h3>
          )}

          {profile.linkedin && (
            <h3 className="mb-5 mt-2 text-sm font-semibold leading-[1.15] cursor-pointer text-blue-500">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.linkedin}
              </a>
            </h3>
          )}
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
