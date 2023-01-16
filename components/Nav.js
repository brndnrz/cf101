import Link from "next/link";
import { useGlobalContext } from "../context";
const Nav = () => {
  const { user, session } = useGlobalContext();

  return (
    <div className=" flex md:px-[30px] px-[15px] mt-[20px]">
      <div className="mr-auto">
        <Link href="/">
          <h1 className="font-Oswald font-medium md:text-[32px] text-[24px] ">
            CF 101
          </h1>
        </Link>
      </div>

      <div className="ml-auto text-center rounded-lg font-Oswald ">
        {session ? (
          <Link href="/profile">
            <div className="p-2 bg-[#f5f5f5] border-b-2 border-b-zinc-800/40 hover:border-2 hover:rounded-lg hover:border-green-600">
              <h1 className="">Welcome Back</h1>
              {user ? (
                <p className="text-green-600">{user.email}</p>
              ) : (
                <p className="text-green-600">CF 101 User</p>
              )}
            </div>
          </Link>
        ) : (
          <Link href="/signin">
            <div className="p-2 rounded-lg bg-zinc-800/20 hover:bg-zinc-800 hover:text-white">
              <h1 className="">Sign In</h1>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
