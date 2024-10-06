import Footer from "../footer/Footer";
import UserNav from "../userNav/UserNav";
import OurStory from "./OurStory";
import TwoSquares from "./TwoSquares";

const Homepage = () => {
  return (
    <div>
      <UserNav/>
      <TwoSquares/>
      <OurStory/>
      <Footer/>
    </div>
  )
}

export default Homepage
