import Header from "../components/Header";
import Footer from "../components/Footer";
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
