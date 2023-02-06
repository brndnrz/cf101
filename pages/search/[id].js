import React from "react";
import SmallGameCard from "../../components/SmallGameCard";
import { baseURL, headers } from "../../utilities/functions";

const SearchGames = ({ fbs, year, week }) => {
  return (
    <>
      <div className="flex flex-col justify-center mt-8 mb-4 font-Oswald">
        <h1 className="mb-4 text-xl text-center">
          Games For Week:{" "}
          <span className="font-medium text-green-600 ">{week}</span> Season:{" "}
          <span className="font-medium text-green-600">{year}</span>
        </h1>
        <section className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4  mb-[16px] mx-[30px]">
          {fbs.map((game) => {
            return <SmallGameCard data={game} key={game.id} />;
          })}
        </section>
      </div>
    </>
  );
};

export default SearchGames;

export async function getServerSideProps(context) {
  const year = context.params.id;
  const week = context.query.week;

  const res = await fetch(
    `${baseURL}games?seasonType=regular&year=${year}&week=${week}&division=fbs`,
    headers
  );
  const data = await res.json();
  const fbs = data.filter((game) => {
    if (game.home_division === "fbs" && game.away_division === "fbs") {
      return game;
    }
  });
  return {
    props: { fbs, year, week },
  };
}
