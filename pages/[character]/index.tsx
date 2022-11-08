import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Character } from "../../types/character";
import CharacterProfile from "../../components/CharacterProfile";
import { CharacterProfileType } from "../../types/character";

const CharacterPage: NextPage<CharacterProfileType> = ({
  data,
  homeworld,
  films,
  species,
  vehicles,
  starships,
}) => {
  return (
    <CharacterProfile
      data={data}
      homeworld={homeworld}
      films={films}
      species={species}
      vehicles={vehicles}
      starships={starships}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const data = await fetch(
    `https://swapi.dev/api/people/${params?.character}`
  ).then((res) => res.json());
  const homeworld = await fetch(data.homeworld).then((res) => res.json());
  const films = await Promise.all(
    await data.films.map(async (i: any) => {
      return await fetch(i).then((res) => res.json());
    })
  );
  const species = await Promise.all(
    await data.species.map(async (i: any) => {
      return await fetch(i).then((res) => res.json());
    })
  );

  const vehicles = await Promise.all(
    await data.vehicles.map(async (i: any) => {
      return await fetch(i).then((res) => res.json());
    })
  );

  const starships = await Promise.all(
    await data.starships.map(async (i: any) => {
      return await fetch(i).then((res) => res.json());
    })
  );

  return {
    props: {
      data,
      homeworld: homeworld.name,
      films: films.map(({ title }) => title),
      species: species.map(({ name }) => name),
      vehicles: vehicles.map(({ name }) => name),
      starships: starships.map(({ name }) => name),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

export default CharacterPage;
