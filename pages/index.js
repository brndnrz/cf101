import Head from "next/head";
import { useState } from "react";
import FeatureCard from "../components/FeatureCard";
import SmallGameCard from "../components/SmallGameCard";
import { baseURL, headers } from "../utilities/functions";

export default function Home({ featuredGames, remainingGames }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="">
      <Head>
        <title>CF 101 | College Football Scores & Stats</title>
        <meta name="title" content="CF 101 | College Football Scores & Stats" />

        <meta
          name="description"
          content="CF 101 is a comprehensive college football score website that offers expert insights on players, coaches, and conferences, and our upcoming transfer portal display keeps fans up to date on where their favorite players are going next. In addition, our live game stats, including real time scores, provide fans with updates on all the action. At CF 101, we are dedicated to providing the best college football coverage available."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://cf101.vercel.app/" />
        <meta
          name="og:title"
          content="CF 101 | College Football Scores & Stats"
        />
        <meta
          name="og:description"
          content="CF 101 is a comprehensive college football score website that offers expert insights on players, coaches, and conferences, and our upcoming transfer portal display keeps fans up to date on where their favorite players are going next. In addition, our live game stats, including real time scores, provide fans with updates on all the action. At CF 101, we are dedicated to providing the best college football coverage available."
        />
        <meta name="og:image" content="/meta.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://cf101.vercel.app/" />
        <meta
          name="twitter:title"
          content="CF 101 | College Football Scores & Stats"
        />
        <meta
          name="twitter:description"
          content="CF 101 is a comprehensive college football score website that offers expert insights on players, coaches, and conferences, and our upcoming transfer portal display keeps fans up to date on where their favorite players are going next. In addition, our live game stats, including real time scores, provide fans with updates on all the action. At CF 101, we are dedicated to providing the best college football coverage available."
        />
        <meta name="twitter:image" content="/meta.png" />
      </Head>

      <main className="">
        <h1 className="font-Oswald ml-[30px] mt-[30px] mb-[16px] text-xl md:text-2xl">
          Top Games
        </h1>

        <section className="flex pt-4 pb-20 overflow-x-scroll xl:justify-center">
          {featuredGames.map((game) => {
            return <FeatureCard data={game} key={game.id} />;
          })}
        </section>

        <h1 className="font-Oswald ml-[30px] mt-[0px] mb-[16px] text-xl md:text-2xl">
          All Games
        </h1>
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-4  mb-[16px] mx-[30px]">
          {showAll
            ? remainingGames.map((game) => {
                return <SmallGameCard data={game} key={game.id} />;
              })
            : remainingGames.slice(0, 15).map((game) => {
                return <SmallGameCard data={game} key={game.id} />;
              })}
          {showAll ? (
            ""
          ) : (
            <div className="text-center col-span-full">
              <button
                className="px-4 py-2 border-2 rounded-lg hover:border-none hover:bg-black hover:text-white "
                onClick={() => setShowAll(!showAll)}
              >
                Show All
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${baseURL}games?seasonType=regular&year=2022&week=13&division=fbs`,
    headers
  );

  const data = await res.json();

  const fbs = data.filter((game) => {
    if (game.home_division === "fbs" && game.away_division === "fbs") {
      return game;
    }
  });

  const featuredGames = fbs.slice(0, 5);
  const remainingGames = fbs.slice(5);
  return {
    props: { featuredGames, remainingGames },
  };
}
