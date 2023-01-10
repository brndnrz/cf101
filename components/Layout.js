import Nav from "./Nav";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <>
      <div className="relative flex flex-col w-screen h-screen">
        <Nav />
        <main className="md:w-[90%] w-full mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
