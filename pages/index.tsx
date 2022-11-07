import type { GetStaticProps, NextPage } from "next";
import DisplayCards from "../components/DisplayCards";
import { Character } from "../types/character";

const Home: NextPage<{ data: Character[] }> = ({ data }) => {
  console.log(data);
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("https://swapi.dev/api/people").then((res) =>
    res.json()
  );

  // console.log(data.results);

  return {
    props: { data: data.results },
  };
};
export default Home;
