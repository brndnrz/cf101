import React from "react";
import { useState } from "react";
import { supabase } from "../supa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleLogin = async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000/profile",
      },
    });

    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {submitted ? (
        <div className="px-[20px] py-[30px] font-Oswald">
          <p className="mb-4 text-center">
            Please Check Your Email To Sign In To CF 101!
          </p>
        </div>
      ) : (
        <div className="px-[20px] py-[30px] font-Oswald">
          <p className="mb-4 text-center">
            Sign in via magic link with your email below
          </p>
          <input
            className="w-full p-4 mb-4 border-2 border-gray-500 rounded-xl"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSubmitted(!submitted);
              handleLogin(email);
            }}
            className="w-full p-2 pl-5 pr-5 mt-4 text-lg text-gray-100 bg-blue-500 border-blue-300 rounded-lg focus:border-4"
          >
            <span>Send magic link</span>
          </button>
        </div>
      )}
    </>
  );
};

export default SignIn;
