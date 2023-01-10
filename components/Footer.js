import { TiSocialTwitterCircular } from "react-icons/ti";
const Footer = () => {
  return (
    <div className="flex items-center px-[30px] mt-auto  font-medium">
      <p>2022 CS 101. ALL RIGHTS RESERVED.</p>
      <a
        href="https://www.twitter.com"
        target="_blank"
        className="ml-auto"
        rel="noreferrer"
      >
        <TiSocialTwitterCircular className="text-[40px] hover:text-twitterBlue" />
      </a>
    </div>
  );
};

export default Footer;
