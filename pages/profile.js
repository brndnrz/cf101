import Link from "next/link";
import SmallGameCard from "../components/SmallGameCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { useGlobalContext } from "../context";

const Profile = () => {
  const { userGames } = useGlobalContext();
  // console.log(userGames);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center font-Oswald">
      {session ? (
        <>
          <div className=" my-[30px] px-[30px] text-center">
            <h3 className="text-2xl lg:text-4xl">
              Welcome Back{" "}
              <span className="text-green-600 ">{session.user?.email}</span>
            </h3>
          </div>
          <button
            className=" hover:bg-green-800 hover:py-[5px]  w-[50%] mx-auto py-[4px] rounded-lg mb-[15px] bg-zinc-800 text-white max-w-md"
            onClick={signOut}
          >
            Sign Out
          </button>
          <div className="w-full border-2 p-[30px] font-Oswald ">
            <h3 className="py-4 text-xl font-bold text-center text-white bg-black ">
              Your Saved Games:
            </h3>
            <div className="w-[85%] mx-auto px-[10px] py-[30px] grid gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {userGames
                ? userGames.map((game) => {
                    return (
                      <SmallGameCard key={game.game} data={game.gameDetails} />
                    );
                  })
                : ""}
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="py-2 mb-4 text-xl text-center">Please Sign In</h3>
          <Link
            href="/signin"
            className=" hover:bg-green-600 hover:py-[5px] text-center w-[50%] mx-auto py-2 mb-[30px] rounded-lg  bg-zinc-800 text-white max-w-md"
          >
            Sign In
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
