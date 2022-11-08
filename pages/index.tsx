import type { GetServerSideProps, NextPage } from "next";
import DisplayCards from "../components/DisplayCards";
import { Character } from "../types/character";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const Home: NextPage<{ data: Character[] }> = ({ data }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState();
  // console.log(data);

  return (
    <div className="flex min-h-screen flex-col items-center py-2 bg-gray-200">
      <h1 className="mt-12 text-xl shadow-xl font-bold bg-gray-800 text-yellow-500 px-3 py-3 rounded-md">
        Star Wars Character Directory 😎
      </h1>
      <p className="w-80 text-sm mt-2 text-center">
        In this place you can look for all the characters of the masterpiece
        saga of StarWars
      </p>
      <DisplayCards data={data} />
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
        {(parseInt(router.query.page as string) < 9 || !router.query.page) && (
          <Link
            href={`/?page=${
              router.query.page ? parseInt(router.query.page[0]) + 1 : 2
            }`}
          >
            <ArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = query.page
    ? await fetch(`https://swapi.dev/api/people/?page=${query.page}`).then(
        (res) => res.json()
      )
    : await fetch(`https://swapi.dev/api/people/?page=1`).then((res) =>
        res.json()
      );

  // console.log(data);

  return {
    props: { data: data.results },
  };
};
export default Home;
