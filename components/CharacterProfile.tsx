import React, { FC } from "react";
import { CharacterProfileType } from "../types/character";

/**
 * Dynamic Route Character Profile
 * @param data - Character data object
 * @param homeworld - string with the homeworld name of the character
 * @param films - array with the films where the character appears
 * @param species - array with species type of the character
 * @param vehicles - array with the vehicles relative to character
 * @param starships - array with starships relative to the character
 * @returns Functional Component with all character info.
 */

const CharacterProfile: FC<CharacterProfileType> = ({
  data,
  homeworld,
  films,
  species,
  vehicles,
  starships,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-800">
      <span className="mt-12 mb-3 text-yellow-400">Character:</span>
      <h1 className="text-4xl  bg-yellow-400 px-5 py-2 rounded-sm font-bold shadow-lg shadow-slate-900">
        {data?.name}
      </h1>
      <div>
        <div className="bg-yellow-500 mt-3 rounded-md p-2 shadow-lg">
          <h3>
            <span className="font-bold">Gender: </span>
            {data?.gender}
          </h3>
          <h3>
            <span className="font-bold">Height: </span>
            {data?.height} cm
          </h3>
          <h3>
            <span className="font-bold">Hair Color:</span> {data?.eye_color}
          </h3>
          <h3>
            <span className="font-bold">Skin Color:</span> {data?.skin_color}
          </h3>
          <h3>
            <span className="font-bold">Eye Color:</span> {data?.eye_color}
          </h3>
          <h3>
            <span className="font-bold">Birth Year:</span> {data?.birth_year}
          </h3>
          <h3>
            <span className="font-bold">HomeWorld:</span> {homeworld}
          </h3>

          <div className="">------------------------------------------</div>
          <h3 className="text-xs">
            <span className="font-bold">Created:</span>{" "}
            {data?.created.toLocaleString()}
          </h3>
          <h3 className="text-xs">
            <span className="font-bold">Created:</span>{" "}
            {data?.edited.toLocaleString()}
          </h3>
        </div>

        {films?.length != 0 && (
          <div className="mt-4 bg-yellow-500 p-2  rounded-md ">
            <h1 className="font-bold">Films</h1>
            <ol>
              {films?.map((i, index) => (
                <li key={index}>- {i}</li>
              ))}
            </ol>
          </div>
        )}

        {species?.length != 0 && (
          <div className="mt-4 bg-yellow-500 p-2  rounded-md ">
            <h1 className="font-bold">Species</h1>
            <ol>
              {species?.map((i, index) => (
                <li key={index}>- {i}</li>
              ))}
            </ol>
          </div>
        )}

        {vehicles?.length != 0 && (
          <div className="mt-4 bg-yellow-500 p-2  rounded-md ">
            <h1 className="font-bold">Vehicles</h1>
            <ol>
              {vehicles?.map((i, index) => (
                <li key={index}>- {i}</li>
              ))}
            </ol>
          </div>
        )}
        {starships?.length != 0 && (
          <div className="mt-4 bg-yellow-500 p-2  rounded-md ">
            <h1 className="font-bold">Starships</h1>
            <ol>
              {starships?.map((i, index) => (
                <li key={index}>- {i}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterProfile;
