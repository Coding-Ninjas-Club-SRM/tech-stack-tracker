"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Feed = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const regex = new RegExp(search, "gi");
    setFilteredResults(
      results.filter((result) => {
        if (domain === "") return regex.test(result.name);
        else if (search === "") return result.domain === domain;
        else return regex.test(result.name) && result.domain === domain;
      }),
    );
  }, [domain, search]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch("/api/user", {
        cache: "no-store",
      });
      const data = await response.json();
      setResults(data);
      setFilteredResults(data);
    };

    fetchResults();
  }, []);
  return (
    <section className="w-screen h-auto p-4">
      <form
        className="flex flex-row justify-center items-center gap-2 flex-wrap"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex-1">
          <label
            for="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden sm:block"
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setToggleDropdown((prev) => !prev)}
          >
            {domain === "" && "Domain"}
            {domain === "aiml" && "AI-ML"}
            {domain === "app" && "App Dev"}
            {domain === "web" && "Web Dev"}{" "}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {toggleDropdown && (
            <div
              id="dropdown"
              className="absolute m-4 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setToggleDropdown(false);
                      setDomain("aiml");
                    }}
                  >
                    AI-ML
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setToggleDropdown(false);
                      setDomain("app");
                    }}
                  >
                    App Dev
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setToggleDropdown(false);
                      setDomain("web");
                    }}
                  >
                    Web Dev
                  </a>
                </li>
                <hr />
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setToggleDropdown(false);
                      setDomain("");
                    }}
                  >
                    Clear
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md rounded-lg mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 whitespace-normal">Name</th>
              <th className="px-6 py-3 sr-only sm:not-sr-only">Domain</th>
              <th className="px-6 py-3 sr-only sm:not-sr-only">Position</th>
              <th className="px-6 py-3">Tech Stack</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer whitespace-normal"
                key={result.index}
                onClick={() => router.push(`/user/${result._id}`)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {result.name}
                </th>
                <td className="px-6 py-4  sr-only sm:not-sr-only">
                  {(result.domain === "aiml" && "AI-ML") ||
                    (result.domain === "app" && "App Dev") ||
                    (result.domain === "web" && "Web Dev")}
                </td>
                <td className="px-6 py-4  sr-only sm:not-sr-only">
                  {result.designation.charAt(0).toUpperCase() +
                    result.designation.slice(1)}
                </td>
                <td className="px-6 py-4">{result.techStack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default Feed;
