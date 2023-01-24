import React from "react";
import Image from "next/image";
import Link from "next/link";
import { conferences } from "../utilities/conferences";
import { con2000 } from "../utilities/con2";

const SmallGameCard = ({ data }) => {
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

  let away_logo, home_logo;
  if (season === 2000) {
    away_logo = con2000
      .find((conferences) => conferences.name === away_conference)
      ?.teams.find((teams) => teams.name === away_team)?.logo;

    home_logo = con2000
      .find((conferences) => conferences.name === home_conference)
      ?.teams.find((teams) => teams.name === home_team)?.logo;
  } else {
    away_logo = conferences
      .find((conferences) => conferences.short_name === away_conference)
      ?.teams.find((teams) => teams.name === away_team)?.logo;

    home_logo = conferences
      .find((conferences) => conferences.short_name === home_conference)
      ?.teams.find((teams) => teams.name === home_team)?.logo;
  }

  return (
    <Link href={`/game/${id}`}>
      <div className="relative flex items-center border-2  h-[80px] rounded-xl sm:h-[60px] px-[2px] lg:h-[75px] hover:border-none hover:bg-gray-900 hover:text-white">
        <div className="team1 w-[50%] h-auto flex justify-start">
          <Image
            src={home_logo}
            width={50}
            height={60}
            alt={home_team}
            className=""
          />
        </div>
        <div className="absolute px-2 text-xl font-medium backdrop-blur-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-Oswald sm:text-lg md:text-xl lg:text-2xl">
          {home_points} - {away_points}
        </div>
        <div className="team2 w-[50%] h-auto flex justify-end">
          <Image
            src={away_logo}
            width={50}
            height={50}
            alt={away_team}
            className=""
          />
        </div>
      </div>
    </Link>
  );
};

export default SmallGameCard;
