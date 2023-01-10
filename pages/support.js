import React from "react";

const Support = () => {
  return (
    <>
      <div className="m-[30px] font-Oswald font-medium md:[&>*]:w-[70%] md:[&>*]:mx-auto ">
        <h1 className="mb-0 text-3xl md:text-center">CS 101</h1>
        <h3 className="mt-0 text-2xl md:text-center">
          For The Love Of College Football
        </h3>
        <p className="p-4 mt-4 font-bold leading-8 rounded-xl bg-zinc-200 font-Oswald md:text-center ">
          CF 101 is a comprehensive college football score website that offers
          expert insights on players, coaches, and conferences, and our upcoming
          transfer portal display keeps fans up to date on where their favorite
          players are going next. In addition, our live game stats, including
          real time scores, provide fans with updates on all the action. At CF
          101, we are dedicated to providing the best college football coverage
          available.
        </p>
      </div>

      <div className="font-medium font-Oswald m-[30px] md:w-[70%] md:mx-auto ">
        <h1 className="text-4xl mb-[16px]">FAQ</h1>

        <ul className="flex flex-col gap-8 md:text-xl">
          <div className="border-2 pl-[8px] py-2 rounded-lg  cursor-pointer w-full relative">
            <input type="checkbox" id="pricing" className="hidden peer " />
            <label
              for="pricing"
              className="absolute top-0 left-0 w-full h-full cursor-pointer "
            ></label>
            <li className="">How much does CS 101 cost?</li>
            <p className="pt-[8px] text-slate-800 hidden peer-checked:block">
              CS 101 is free to use. If you&apos;d like to remove ads consider
              subscribing for $2 a month.
            </p>
          </div>
          <div className="border-2 pl-[8px] py-2 rounded-lg  cursor-pointer w-full relative">
            <input type="checkbox" id="sources" className="hidden peer " />
            <label
              for="sources"
              className="absolute top-0 left-0 w-full h-full cursor-pointer "
            ></label>
            <li className="">What are your sources?</li>
            <p className="pt-[8px] text-slate-800 hidden peer-checked:block">
              We have a full staff committed to providing the most accurate
              information.
            </p>
          </div>
          <div className="border-2 pl-[8px] py-2 rounded-lg  cursor-pointer w-full relative">
            <input type="checkbox" id="location" className="hidden peer " />
            <label
              for="location"
              className="absolute top-0 left-0 w-full h-full cursor-pointer "
            ></label>
            <li className="">Where are CS 101&apos;s headquarters?</li>
            <p className="pt-[8px] text-slate-800 hidden peer-checked:block">
              We&apos;re based in Texas! 🤠
            </p>
          </div>
          <div className="border-2 pl-[8px] py-2 rounded-lg  cursor-pointer w-full relative">
            <input type="checkbox" id="favorite" className="hidden peer " />
            <label
              for="favorite"
              className="absolute top-0 left-0 w-full h-full cursor-pointer "
            ></label>
            <li className="">Does CS 101 have a favorite team?</li>
            <p className="pt-[8px] text-slate-800 hidden peer-checked:block peer">
              We&apos;re completely unbiased when it comes to our favorite
              college football team. 🐮{" "}
              <span className="text-texasOrange">Hook&apos;Em!</span> 🐮
            </p>
          </div>
        </ul>

        <h1 className="text-4xl mb-[16px] mt-[60px]">Support</h1>
        <h3 className="">
          If you need assisstance{" "}
          <a
            href="mailto:brndnruiz@gmail.com?subject=I Need Assisstance From CS 101..."
            className="underline hover:text-twitterBlue text-slate-600"
          >
            Send Us An Email
          </a>{" "}
          and we&apos;ll get back to you ASAP!
        </h3>
      </div>
    </>
  );
};

export default Support;
