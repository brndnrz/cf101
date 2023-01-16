import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { supabase } from "./supa";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(false);
  const [userGames, setUserGames] = useState([]);
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") {
      setSession(session);
      setUser(session.user);
      console.log("SIGNED_IN", session);
    }
    if (event == "SIGNED_OUT") {
      setSession(null);
      setUser(null);
      console.log("SIGNED_OUT", session);
    }
  });

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      setUser(null);
      setSession(false);
      setUserGames([]);
      router.push("/");
    }
  };

  const handleSave = async (game) => {
    console.log(`making the call`);
    const {
      away_conference,
      away_division,
      away_line_scores,
      away_points,
      away_team,
      completed,
      home_conference,
      home_division,
      home_line_scores,
      home_points,
      home_team,
      season,
      id,
      season_type,
      start_date,
      venue,
      week,
    } = game;

    const { data, error } = await supabase
      .from("userGames")
      .insert({
        games: {
          away_conference: away_conference,
          away_division: away_division,
          away_line_scores: away_line_scores,
          away_points: away_points,
          away_team: away_team,
          completed: completed,
          home_conference: home_conference,
          home_division: home_division,
          home_line_scores: home_line_scores,
          home_points: home_points,
          home_team: home_team,
          season: season,
          id: id,
          season_type: season_type,
          start_date: start_date,
          venue: venue,
          week: week,
        },
        userKey: user.id,
      })
      .select();

    if (data) {
      console.log(data[0]);
      let tmp = [
        ...userGames,
        {
          game: data[0].games.id,
          supaID: data[0].id,
          gameDetails: game,
        },
      ];
      setUserGames(tmp);

      console.log("Game saved successfully!");
    }

    if (error) {
      console.log(error);
    }
    console.log(`i've ended the save function`);
  };
  const handleUnSave = async (game) => {
    console.log(`running unsave`);
    let oldGames = [...userGames];
    let gameToRemove = oldGames.filter(
      (savedGame) => savedGame.game === game.id
    );
    console.log(gameToRemove);
    const { data, error } = await supabase
      .from("userGames")
      .delete()
      .eq(`id`, gameToRemove[0].supaID)
      .select();

    if (data) {
      let filtered = oldGames.filter((gameID) => gameID.game != game.id);
      setUserGames(filtered);
    }
    console.log(userGames);
    console.log(`exiting unsave`);
  };

  return (
    <AppContext.Provider
      value={{
        signOut,
        session,
        user,
        userGames,
        handleSave,
        handleUnSave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
