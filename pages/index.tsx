import type { GetServerSideProps, NextPage } from "next";
import DisplayCards from "../components/DisplayCards";
import { Character } from "../types/character";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { ChangeEvent } from "react";

const Home: NextPage<{ data: Character[] }> = ({ data }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`?search=${encodeURI(search)}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-2 bg-gray-200">
      <h1 className="mt-12 text-xl shadow-xl font-bold bg-gray-800 text-yellow-500 px-3 py-3 rounded-md">
        Star Wars Character Directory 😎
      </h1>

      <p className="w-80 text-sm mt-2 text-center">
        In this place you can look for all the characters of the masterpiece
        saga of StarWars
      </p>

      {/* Search Input */}
      <form
        className="flex flex-col items-center mb-2"
        onSubmit={handleSearch}
        method="POST"
      >
        <input
          onChange={handleInputChange}
          className="bg-gray-300 mt-3 rounded-md text-center placeholder-gray-700"
          placeholder="Search Here"
          type="text"
        />
        <p className="text-[0.6rem] pt-1">(press Enter to search)</p>
      </form>

      {/* Card Displaying */}
      <DisplayCards data={data} />

      {/* Page and search conditions Handling */}
      {!router.query.search ? (
        <div className="mb-4">
          {parseInt(router.query.page as string) > 1 && (
            <Link
              href={`/?page=${
                router.query.page ? parseInt(router.query.page[0]) - 1 : 1
              }`}
            >
              <ArrowLeft />
            </Link>
          )}
          <span>current page {router.query.page ? router.query.page : 1} </span>
          {(parseInt(router.query.page as string) < 9 ||
            !router.query.page) && (
            <Link
              href={`/?page=${
                router.query.page ? parseInt(router.query.page[0]) + 1 : 2
              }`}
            >
              <ArrowRight />
            </Link>
          )}
        </div>
      ) : (
        data.length < 1 && (
          <div className="bg-red-500 w-fit p-3 mt-5 rounded-md text-red-100 font-bold flex flex-col items-center">
            No results for the current search :(
          </div>
        )
      )}
    </div>
  );
};

/*
Fetching information with server side rendering. This approach is used mainly because of the API design (page limited data - 10 items/page), StaticProps could be also used by fetching all the pages at once and it would be faster in navigation but would require other search solution. 

We can also search characters and render via server with this approach (getServerSideProps), and overall this is a convinient way for the case and API design.
*/

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { search } = query;
  const { page } = query;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  if (search) {
    const data = await fetch(
      `https://swapi.dev/api/people/?search=${search}`
    ).then((res) => res.json());
    return {
      props: { data: data.results },
    };
  } else {
    const data = page
      ? await fetch(`https://swapi.dev/api/people/?page=${page}`).then((res) =>
          res.json()
        )
      : await fetch(`https://swapi.dev/api/people/?page=1`).then((res) =>
          res.json()
        );

    return {
      props: { data: data.results },
    };
  }
};
export default Home;
