import Header from "../compotents/Header";
import Footer from "../compotents/Footer";
const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
