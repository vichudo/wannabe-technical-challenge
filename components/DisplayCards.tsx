import { NextPage } from "next";
import React from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "../types/character";

/**
 * Iterates all characters to display their Cards
 * @param  {Character[]} Character array of all the iterable info.
 * @return {NextPage}
 */

const DisplayCards: NextPage<{ data: Character[] }> = ({ data }) => {
  return (
    <div className="flex flex-wrap  justify-center gap-4 mx-32 md:mx-72 lg:mx-96">
      {data?.map((i, index) => (
        <CharacterCard key={index} data={i} />
      ))}
    </div>
  );
};

export default DisplayCards;
