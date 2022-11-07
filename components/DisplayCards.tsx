import { NextPage } from "next";
import React from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "../types/character";

const DisplayCards: NextPage<{ data: Character[] }> = ({ data }) => {
  return (
    <div>
      {data.map((i, index) => (
        <CharacterCard key={index} data={i} />
      ))}
    </div>
  );
};

export default DisplayCards;
