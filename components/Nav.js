import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SlClose } from "react-icons/sl";
import { useSession } from "@supabase/auth-helpers-react";
import { useGlobalContext } from "../context";
const Nav = () => {
  const session = useSession();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = () => {
    let userWeek = document.getElementById("week").value;
    let userYear = document.getElementById("year").value;
    setShowMenu(!showMenu);
    router.push({
      pathname: `/search/${userYear}`,
      query: { week: userWeek },
    });
  };

  let currentYear = new Date().getFullYear();
  const weeks = Array.from({ length: 14 }, (_, index) => index + 1);
  let N = currentYear - 2000;
  let years = Array.from({ length: N }, (_, index) =>
    index === 0 ? 2000 : 2000 + index
  );
  return (
    <>
      <div className=" flex md:px-[30px] px-[15px] mt-[20px]">
        <div className="mr-auto">
          <Link href="/">
            <h1 className="font-Oswald font-medium md:text-[32px] text-[24px] ">
              CF 101
            </h1>
          </Link>
        </div>

        <div className="flex items-center ml-auto text-center rounded-lg font-Oswald">
          {session ? (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className=" cursor-pointer flex  items-center px-2 py-0 mr-4 border-2 rounded-lg h-[50%]  hover:bg-black hover:text-white hover:border-4"
              >
                <FiSearch className="text-xl" />
              </button>
              <Link href="/profile">
                <div className="p-2 bg-[#f5f5f5] border-b-2 border-b-zinc-800/40 hover:border-2 hover:rounded-lg hover:border-green-600 ">
                  <h1 className="">Welcome Back</h1>
                  {session.user ? (
                    <p className="text-green-600">{session.user.email}</p>
                  ) : (
                    <p className="text-green-600">CF 101 User</p>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <Link href="/signin">
              <div className="p-2 rounded-lg bg-zinc-800/20 hover:bg-zinc-800 hover:text-white">
                <h1 className="">Sign In</h1>
              </div>
            </Link>
          )}
        </div>
      </div>

      {showMenu ? (
        <div className="absolute inset-0 z-50 w-full h-screen mx-auto text-white rounded-b-lg bg-black/50 backdrop-blur-lg font-Oswald">
          <SlClose
            className="ml-auto text-4xl mr-[15px] mt-[15px] hover:cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          <h3 className="mt-20 text-2xl text-center">Search</h3>

          <div className="w-full  px-[30px] ">
            <div className="flex items-center justify-center gap-8 py-4 text-black">
              <div className="flex gap-2">
                <h3 className="text-white">Week:</h3>
                <select name="week" id="week">
                  {weeks.map((week) => {
                    return (
                      <option key={Math.random(week * 3328888)} value={week}>
                        {week}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex gap-2">
                <h3 className="text-white">Year:</h3>
                <select name="year" id="year">
                  {years.map((year) => {
                    return (
                      <option key={Math.random(year * 11000)} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="justify-center py-2 w-[50%] mx-auto text-center ">
              <button
                onClick={handleSearch}
                className="px-4 py-2 border-2 rounded-lg hover:bg-black hover:text-white hover:border-4"
              >
                View Games
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Nav;
