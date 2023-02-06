import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLogo } from "../utilities/functions";

const FeatureCard = ({ data }) => {
  const {
    id,
    away_team,
    away_points,
    home_team,
    home_points,
    away_conference,
    home_conference,
    season,
  } = data;

  let away_logo = getLogo(season, away_conference, away_team);
  let home_logo = getLogo(season, home_conference, home_team);

  return (
    <Link href={`/game/${id}`}>
      <div className=" ml-[30px] w-[250px]  h-[200px] p-4 shadow-2xl rounded-xl flex relative">
        <div className=" w-[50%] team1 flex justify-start">
          <Image
            src={away_logo}
            height={200}
            width={250}
            alt={away_team}
            className="self-end h-[30%] w-auto"
          />
        </div>
        <div className="absolute score top-[70px] left-[90px] text-4xl font-bold font-Oswald">
          {away_points} - {home_points}
        </div>
        <div className="team2 w-[50%]  flex justify-end">
          <Image
            src={home_logo}
            height={200}
            width={250}
            alt={home_team}
            className="self-start h-[30%] w-auto"
          />
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
