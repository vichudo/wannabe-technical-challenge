import type { GetStaticProps, NextPage } from "next";
import DisplayCards from "../components/DisplayCards";

import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { ChangeEvent } from "react";

const Home: NextPage<{ data: any }> = ({ data }) => {
  const router = useRouter();
  const [search_, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<any>();
  const { page } = router.query;
  // const { search } = router.query;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => e.target.value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    //In case of using serverSideProps, you can use
    // router.push(`?search=${encodeURI(search_)}`)
    //to query params via server
  };

  useEffect(() => {
    if (page) {
      setPageNumber(page);
    } else {
      setPageNumber("1");
    }
  }, [router]);

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
        <p className="text-[0.6rem] pt-1">(Dynamic Search)</p>
      </form>

      {/* Card Displaying */}
      <DisplayCards
        data={
          search_
            ? Object.values(data)
                .flat(Infinity)
                .filter(({ name }: any) =>
                  name.toLowerCase().match(search_.toLowerCase())
                )
            : data[parseInt(pageNumber) - 1]
        }
      />

      {/* Page and search conditions Handling */}
      {!router.query.search ? (
        <div className="mb-4">
          {parseInt(pageNumber) > 1 && (
            <Link href={`/?page=${page ? parseInt(pageNumber) - 1 : 1}`}>
              <ArrowLeft />
            </Link>
          )}
          <span>current page {page ? page : 1} </span>
          {(parseInt(pageNumber) < 9 || !page) && (
            <Link href={`/?page=${page ? parseInt(pageNumber) + 1 : 2}`}>
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

export const getStaticProps: GetStaticProps = async () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const data = await Promise.all(
    pages.map(
      async (i) =>
        await fetch(`https://swapi.dev/api/people/?page=${i}`).then((res) =>
          res.json()
        )
    )
  );

  const final_data = { ...data.map(({ results }) => [...results]) };

  return {
    props: { data: final_data },
  };
};
export default Home;
