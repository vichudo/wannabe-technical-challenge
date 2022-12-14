import React, { FC } from "react";
import type { Character } from "../types/character";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";

const example: Character = {
  name: "Obi-Wan Kenobi",
  height: "182",
  mass: "77",
  hair_color: "auburn, white",
  skin_color: "fair",
  eye_color: "blue-gray",
  birth_year: "57BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/20/",
  films: [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/4/",
    "https://swapi.dev/api/films/5/",
    "https://swapi.dev/api/films/6/",
  ],
  species: [],
  vehicles: ["https://swapi.dev/api/vehicles/38/"],
  starships: [
    "https://swapi.dev/api/starships/48/",
    "https://swapi.dev/api/starships/59/",
    "https://swapi.dev/api/starships/64/",
    "https://swapi.dev/api/starships/65/",
    "https://swapi.dev/api/starships/74/",
  ],
  created: "2014-12-10T16:16:29.192000Z",
  edited: "2014-12-20T21:17:50.325000Z",
  url: "https://swapi.dev/api/people/10/",
};

/**
 * Small Card Component.
 * @param data - Object with all the character data.
 * @returns Functional Component with partial character info.
 */
const CharacterCard: FC<{ data: Character | null }> = ({ data }) => {
  return (
    <div className="flex justify-between">
      <div>
        <div className="w-72 h-fit py-3 my-2 bg-gray-800 rounded-md flex pr-6  text-white">
          <div className="w-72 h-fit bg-gray-800 rounded-md flex flex-col  text-white">
            <h2 className="text-yellow-500 ml-3 font-bold">{data?.name}</h2>
            <span className="ml-3 text-xs ">
              <span className="font-bold">born:</span> {data?.birth_year}
            </span>
            <span className="ml-3 text-xs ">
              <span className="font-bold">height:</span> {data?.height}
            </span>
            <span className="ml-3 text-xs ">
              <span className="font-bold">mass:</span> {data?.mass}
            </span>
          </div>
          <Link href={`/${data?.url.replace(/\D/g, "")}`}>
            <button className="text-sm ">
              Explore
              <OpenInNewIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
