import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Character } from "../../types/character";
import CharacterProfile from "../../components/CharacterProfile";

const Character: NextPage<{ data: Character }> = ({ data }) => {
  console.log(data);
  return <CharacterProfile data={data} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch(
    `https://swapi.dev/api/people/${params?.character}`
  ).then((res) => res.json());
  return {
    props: { data },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ params }: Params) => {
  let homeworld = "";
  const data = await fetch("https://swapi.dev/api/people/").then((res) =>
    res.json()
  );

  const paths = data.results.map(({ url }: any) => ({
    params: { character: url.replace(/\D/g, "") },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Character;
