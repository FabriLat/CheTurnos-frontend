import Footer from "../footer/Footer";
import UserNav from "../userNav/UserNav";
import OurStory from "./OurStory";
import Carousel from "./Carousel";

const Homepage = () => {
  return (
    <div>
      <UserNav/>
      <Carousel/>
      <OurStory/>
      <Footer/>
    </div>
  )
}

export default Homepage
