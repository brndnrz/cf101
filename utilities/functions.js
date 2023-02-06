import { years } from "./years";
export const baseURL = `https://api.collegefootballdata.com/`;

export const headers = {
  headers: {
    Authorization: process.env.AUTH,
  },
};

export const getLogo = (season, conference, team) => {
  let conLogo;
  if (season >= 2000) {
    conLogo = years[season]
      .find((conferences) => conferences.name === conference)
      ?.teams.find((teams) => teams.name == team)?.logo;
  }
  return conLogo;
};

export const getConference = (season, conference) => {
  let con;
  if (season >= 2000) {
    con = years[season].find(
      (conferences) => conferences.short_name === conference
    )?.abbreviation;
  }
  return con;
};
