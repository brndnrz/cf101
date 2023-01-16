import React, { useState, useEffect } from "react";
import Image from "next/image";
import { conferences } from "../../utilities/conferences";
import { baseURL } from "../../utilities/functions";
import SmallGameCard from "../../components/SmallGameCard";
import { useGlobalContext } from "../../context";
import Link from "next/link";

const GamePage = ({
  game,
  home_logo,
  away_logo,
  lastFourAway,
  lastFourHome,
  homeConferenceTeams,
  awayConferenceTeams,
}) => {
  const {
    id,
    season,
    completed,
    start_date,
    // week,
    // venue,
    away_team,
    away_points,
    home_team,
    home_points,
    // away_conference,
    // home_conference,
    home_line_scores,
    away_line_scores,
  } = game;
  const { session, userGames, handleSave, handleUnSave } = useGlobalContext();

  const [showHome, setShowHome] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(null);
  const [showUnSave, setShowUnSave] = useState(null);

  useEffect(() => {
    console.log(`i'm running`);
    if (userGames.length > 0) {
      console.log(userGames);
      if (userGames.find((savedGame) => savedGame.game === id)) {
        console.log(`i was found`);
        setShowSaveButton(false);
        setShowUnSave(true);
      } else {
        console.log(`i wasn't found`);
        setShowSaveButton(true);
        setShowUnSave(false);
      }
    } else {
      setShowSaveButton(true);
      setShowUnSave(false);
    }
    console.log(`i ran`);
  }, [id, showSaveButton, userGames]);

  let day = new Date(start_date).toDateString().split(" ")[0];
  let date = new Date(start_date)
    .toDateString()
    .split(" ")
    .slice(1, 3)
    .join(" ");

  let fixed;
  let length = home_line_scores.length;
  if (length > 4) {
    let adjustedWidth = 100 / (length + 1);

    fixed = adjustedWidth.toFixed(2);
  } else {
    // 4 quarters + logo and TOT = 6
    let adjustedWidth = 100 / 5;
    fixed = adjustedWidth.toFixed(2);
  }

  return (
    <div className="">
      <div className="w-full px-[20px] py-[20px]  h-[300px] grid grid-cols-2 relative">
        <div className="flex flex-col items-center border-t-2 border-b-2 border-l-2 rounded-tl-xl rounded-bl-xl ">
          <h1 className="text-2xl font-Oswald">{home_team}</h1>
          <Image
            src={home_logo}
            width={50}
            height={60}
            alt={home_team}
            className="self-start mt-auto "
          />
        </div>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {completed ? (
            <div className="flex flex-col justify-center text-center font-Oswald mb-[10px] ">
              <h3 className="font-bold">Final</h3>
              <h3 className="">
                {day} {date}
              </h3>
            </div>
          ) : (
            ""
          )}
          <h3 className="text-4xl font-Oswald">
            {home_points} - {away_points}{" "}
          </h3>
        </div>
        <div className="flex flex-col items-center border-t-2 border-b-2 border-r-2 rounded-tr-xl rounded-br-xl">
          <h1 className="text-2xl font-Oswald">{away_team}</h1>
          <Image
            src={away_logo}
            width={50}
            height={60}
            alt={away_team}
            className="self-end mt-auto "
          />
        </div>
      </div>

      <div className="mb-6 text-center font-Oswald">
        {session === false ? (
          <Link href="/signin">
            <button className="bg-black text-white p-[10px] rounded-xl hover:bg-green-600">
              Sign In To Save Game
            </button>
          </Link>
        ) : (
          ""
        )}

        {session && showSaveButton ? (
          <button
            onClick={() => handleSave(game)}
            className="text-white bg-green-600 p-[10px] rounded-xl hover:bg-black hover:p-[8px] "
          >
            Save Game
          </button>
        ) : (
          ""
        )}
        {session && showUnSave ? (
          <button
            onClick={() => handleUnSave(game)}
            className="text-white bg-black  p-[10px] rounded-xl hover:bg-red hover:p-[8px] "
          >
            UnSave Game
          </button>
        ) : (
          ""
        )}
      </div>
      <div className=" lg:flex">
        <div className="flex flex-col w-full lg:max-w-[50%]">
          <div className=" w-full  h-[200px] lg:h-auto font-Oswald px-2">
            <h3 className="py-2 text-center text-white bg-black ">
              Score Summary
            </h3>
            <div className=" h-[50px] w-full flex justify-between mt-[20px] border-t-2 border-b-2 border-l-2  ">
              <Image
                src="/time.png"
                width={50}
                height={50}
                alt="Time"
                className="mx-auto "
              />
              {home_line_scores.map((quarter, idx) => {
                return (
                  <div
                    className="flex items-center justify-center h-auto border-2 border-y-0 w-[50px] sm:w-[60px]"
                    key={Math.random(1134 * ((idx + 1) * 2))}
                  >
                    <h3 className="p-0 m-0 text-2xl text-center ">
                      {idx >= 4 ? "OT" : `Q${idx + 1}`}
                    </h3>
                  </div>
                );
              })}
              <div className="flex items-center justify-center h-auto border-2 border-y-0 w-[50px] sm:w-[60px]">
                <h3 className="text-2xl text-center">TOT</h3>
              </div>
            </div>
            <div className="flex justify-between w-full border-b-2 border-l-2 ">
              <Image
                src={home_logo}
                width={50}
                height={60}
                alt={home_team}
                className="mx-auto"
              />
              {home_line_scores.map((quarter, idx) => {
                return (
                  <div
                    className="flex items-center justify-center h-auto border-2 border-y-0 w-[50px] sm:w-[60px]"
                    key={Math.random(1134 * ((idx + 1) * 4))}
                  >
                    <h3 className="text-2xl text-center ">{quarter}</h3>
                  </div>
                );
              })}
              <div className="flex items-center justify-center border-2 border-y-0 w-[50px] sm:w-[60px]">
                <h3 className="text-2xl font-bold font-Oswald">
                  {home_points}
                </h3>
              </div>
            </div>
            <div className="flex justify-between w-full border-b-2 border-l-2 ">
              <Image
                src={away_logo}
                width={50}
                height={60}
                alt={away_team}
                className="mx-auto"
              />
              {away_line_scores.map((quarter, idx) => {
                return (
                  <div
                    className="flex items-center justify-center h-auto border-2 border-y-0 w-[50px] sm:w-[60px]"
                    key={Math.random(1134 * idx)}
                  >
                    <h3 className="text-2xl text-center ">{quarter}</h3>
                  </div>
                );
              })}
              <div className="flex items-center justify-center border-2 border-y-0  w-[50px] sm:w-[60px]">
                <h3 className="text-2xl font-bold font-Oswald">
                  {away_points}
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full  h-auto mt-[30px] lg:mt-0  font-Oswald p-[20px]">
            <h3 className="">Recent Games</h3>
            <div className="grid grid-rows-2 gap-y-4">
              <div className="grid grid-cols-2 gap-2 xl:grid-cols-4 ">
                {lastFourHome.map((game) => {
                  return (
                    <SmallGameCard
                      key={Math.random(game.id * 12331)}
                      data={game}
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                {lastFourAway.map((game) => {
                  return (
                    <SmallGameCard
                      key={Math.random(game.id * 1442301)}
                      data={game}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:max-w-[50%]  h-auto  font-Oswald px-2 ">
          <h3 className="py-2 text-center text-white bg-black">
            Conference Standings: {season}
          </h3>
          <div className="w-full h-auto  p-[20px] ">
            <div className="flex w-full text-center border-2">
              <h3
                onClick={() => setShowHome(!showHome)}
                className="hover:bg-black hover:text-white hover:cursor-pointer w-[50%] border-r-2"
              >
                {home_team}
              </h3>
              <h3
                onClick={() => setShowHome(!showHome)}
                className="hover:bg-black hover:text-white hover:cursor-pointer w-[50%] border-l-2"
              >
                {away_team}
              </h3>
            </div>
            <div className="flex justify-around w-full border-2">
              <h3>Team</h3>
              <h3>Overall</h3>
              <h3>Conf.</h3>
            </div>
            {showHome
              ? homeConferenceTeams[0] === 0
                ? homeConferenceTeams.map((team, idx) => {
                    if (team === 0 || team === 1) {
                      return (
                        <div
                          className="flex justify-start w-full text-center text-white bg-black"
                          key={Math.random((idx + 1) * 52 * 93144)}
                        >
                          <h3 className="w-[33%] border-l-2">
                            {homeConferenceTeams[idx + 1]?.division}
                          </h3>
                        </div>
                      );
                    }
                    return (
                      <div
                        className="flex justify-around w-full text-center"
                        key={Math.random((idx + 1) * 21 * 881)}
                      >
                        <h3 className=" w-[33%]  border-2">{team.teamName}</h3>
                        <h3 className=" w-[33%]  border-2">
                          {team.overallSeasonRecord}
                        </h3>
                        <h3 className="w-[33%] border-2">
                          {team.conferenceRecord}
                        </h3>
                      </div>
                    );
                  })
                : homeConferenceTeams.map((team, idx) => {
                    return (
                      <div
                        className="flex justify-around w-full text-center"
                        key={Math.random((idx + 1) * 88888 * 4352)}
                      >
                        <h3 className=" w-[33%]  border-2">{team.teamName}</h3>
                        <h3 className=" w-[33%]  border-2">
                          {team.overallSeasonRecord}
                        </h3>
                        <h3 className="w-[33%] border-2">
                          {team.conferenceRecord}
                        </h3>
                      </div>
                    );
                  })
              : awayConferenceTeams[0] === 0
              ? awayConferenceTeams.map((team, idx) => {
                  if (team === 0 || team === 1) {
                    return (
                      <div
                        className="flex justify-start w-full text-center text-white bg-black"
                        key={Math.random((idx + 1) * 901 * 93144)}
                      >
                        <h3 className="w-[33%] border-l-2">
                          {awayConferenceTeams[idx + 1]?.division}
                        </h3>
                      </div>
                    );
                  }
                  return (
                    <div
                      className="flex justify-around w-full text-center"
                      key={Math.random((idx + 1) * 66 * 881)}
                    >
                      <h3 className=" w-[33%]  border-2">{team.teamName}</h3>
                      <h3 className=" w-[33%]  border-2">
                        {team.overallSeasonRecord}
                      </h3>
                      <h3 className="w-[33%] border-2">
                        {team.conferenceRecord}
                      </h3>
                    </div>
                  );
                })
              : awayConferenceTeams.map((team, idx) => {
                  return (
                    <div
                      className="flex justify-around w-full text-center"
                      key={Math.random((idx + 1) * 77 * 4352)}
                    >
                      <h3 className=" w-[33%]  border-2">{team.teamName}</h3>
                      <h3 className=" w-[33%]  border-2">
                        {team.overallSeasonRecord}
                      </h3>
                      <h3 className="w-[33%] border-2">
                        {team.conferenceRecord}
                      </h3>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${baseURL}games?id=${id}`, {
    headers: {
      Authorization: process.env.AUTH,
    },
  });

  const data = await res.json();

  let homeConName = data[0].home_conference;
  let awayConName = data[0].away_conference;
  const home_team = data[0].home_team;
  const away_team = data[0].away_team;
  const season = data[0].season;

  let home_conference = conferences.find(
    (conferences) => conferences.short_name === homeConName
  )?.abbreviation;

  let away_conference = conferences.find(
    (conferences) => conferences.short_name === awayConName
  )?.abbreviation;

  const [homeConRecordRes, awayConRecordRes, homeGamesRes, awayGamesRes] =
    await Promise.all([
      fetch(`${baseURL}records?conference=${home_conference}&year=${season}`, {
        headers: {
          Authorization: process.env.AUTH,
        },
      }),
      fetch(`${baseURL}records?conference=${away_conference}&year=${season}`, {
        headers: {
          Authorization: process.env.AUTH,
        },
      }),
      fetch(`${baseURL}games/?team=${home_team}&year=${season}`, {
        headers: {
          Authorization: process.env.AUTH,
        },
      }),
      fetch(`${baseURL}games/?team=${away_team}&year=${season}`, {
        headers: {
          Authorization: process.env.AUTH,
        },
      }),
    ]);

  const [homeConferenceTeams, awayConferenceTeams, homeGames, awayGames] =
    await Promise.all([
      homeConRecordRes.json(),
      awayConRecordRes.json(),
      homeGamesRes.json(),
      awayGamesRes.json(),
    ]);
  let away_logo = conferences
    .find((conferences) => conferences.short_name === data[0].away_conference)
    ?.teams.find((teams) => teams.name === data[0].away_team)?.logo;

  let home_logo = conferences
    .find((conferences) => conferences.short_name === data[0].home_conference)
    ?.teams.find((teams) => teams.name === data[0].home_team)?.logo;

  let lastFourHome = homeGames.slice(-4);
  let lastFourAway = awayGames.slice(-4);

  let homeTeamRecords1 = [];
  let homeTeamRecords2 = [];
  let homeNoDivisions = [];
  let d1 = homeConferenceTeams[0]?.division;
  let awayTeamRecords1 = [];
  let awayTeamRecords2 = [];
  let awayNoDivisions = [];
  let d2 = awayConferenceTeams[0]?.division;
  if (homeConferenceTeams[0]?.division !== "") {
    homeConferenceTeams.forEach((team) => {
      if (team.division === d1) {
        homeTeamRecords1.push({
          teamName: team.team,
          division: team.division,
          overallSeasonRecord: `${team.total.wins} - ${team.total.losses}`,
          conferenceRecord: `${team.conferenceGames.wins} - ${team.conferenceGames.losses}`,
          position: team.conferenceGames.wins - team.conferenceGames.losses,
        });
      } else {
        homeTeamRecords2.push({
          teamName: team.team,
          division: team.division,
          overallSeasonRecord: `${team.total.wins} - ${team.total.losses}`,
          conferenceRecord: `${team.conferenceGames.wins} - ${team.conferenceGames.losses}`,
          position: team.conferenceGames.wins - team.conferenceGames.losses,
        });
      }
    });
  } else {
    homeConferenceTeams.forEach((team) => {
      homeNoDivisions.push({
        teamName: team.team,
        overallSeasonRecord: `${team.total.wins} - ${team.total.losses}`,
        conferenceRecord: `${team.conferenceGames.wins} - ${team.conferenceGames.losses}`,
        position: team.conferenceGames.wins - team.conferenceGames.losses,
      });
    });
  }

  if (awayConferenceTeams[0]?.division !== "") {
    awayConferenceTeams.forEach((team) => {
      if (team.division === d2) {
        awayTeamRecords1.push({
          teamName: team.team,
          division: team.division,
          overallSeasonRecord: `${team.total.wins} - ${team.total.losses}`,
          conferenceRecord: `${team.conferenceGames.wins} - ${team.conferenceGames.losses}`,
          position: team.conferenceGames.wins - team.conferenceGames.losses,
        });
      } else {
        awayTeamRecords2.push({
          teamName: team.team,
          division: team.division,
          overallSeasonRecord: `${team.total.wins} - ${team.total.losses}`,
          conferenceRecord: `${team.conferenceGames.wins} - ${team.conferenceGames.losses}`,
          position: team.conferenceGames.wins - team.conferenceGames.losses,
        });
      }
    });
  } else {
    awayConferenceTeams.forEach((team) => {
      awayNoDivisions.push({
        teamName: team.team,
        overallSeasonRecord: `${team.total.wins} - ${team.total.losses}`,
        conferenceRecord: `${team.conferenceGames.wins} - ${team.conferenceGames.losses}`,
        position: team.conferenceGames.wins - team.conferenceGames.losses,
      });
    });
  }

  let homeSortedDivisions = [
    0,
    ...homeTeamRecords1.sort((a, b) => b.position - a.position),
    1,
    ...homeTeamRecords2.sort((a, b) => b.position - a.position),
  ];

  let awaySortedDivisions = [
    0,
    ...awayTeamRecords1.sort((a, b) => b.position - a.position),
    1,
    ...awayTeamRecords2.sort((a, b) => b.position - a.position),
  ];

  let homeSortedNoDivisions = homeNoDivisions.sort(
    (a, b) => b.position - a.position
  );
  let awaySortedNoDivisions = awayNoDivisions.sort(
    (a, b) => b.position - a.position
  );

  return {
    props: {
      game: data[0],
      home_logo,
      away_logo,
      lastFourAway,
      lastFourHome,
      homeConferenceTeams:
        homeSortedDivisions.length > 4
          ? homeSortedDivisions
          : homeSortedNoDivisions,
      awayConferenceTeams:
        awaySortedDivisions.length > 4
          ? awaySortedDivisions
          : awaySortedNoDivisions,
    },
  };
}
