import { NextPage } from "next";
import React from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "../types/character";

const DisplayCards: NextPage<{ data: Character[] }> = ({ data }) => {
  return (
    <div className="flex flex-wrap  justify-center gap-4 mx-32">
      {data?.map((i, index) => (
        <CharacterCard key={index} data={i} />
      ))}
    </div>
  );
};

export default DisplayCards;
