// import { useContext} from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
// import Loading from "../components/Loading/Loading";
// import { AuthContext } from "../contexts/Auth";

const MainLayout = () => {
  // const {loading, setLoading} = useContext(AuthContext)

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, [setLoading]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
};

export default MainLayout;
