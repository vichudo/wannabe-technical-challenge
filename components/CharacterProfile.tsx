import React, { FC } from "react";
import { Character } from "../types/character";

const CharacterProfile: FC<{ data: Character }> = ({ data }) => {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-800">
      <span className="mt-12 mb-3 text-yellow-400">Character:</span>
      <h1 className="text-4xl  bg-yellow-400 px-5 py-2 rounded-sm font-bold shadow-lg shadow-slate-900">
        {data?.name}
      </h1>

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
        {/* <h3>
          <span className="font-bold">HomeWorld:</span> {data?.homeworld}
        </h3> */}
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
    </div>
  );
};

export default CharacterProfile;
