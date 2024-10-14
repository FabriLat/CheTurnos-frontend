import Footer from "../footer/Footer";
import UserNav from "../userNav/UserNav";
import OurStory from "./ourstory/OurStory";
import Carousel from "./carousel/Carousel";
import Card from "./card/Card"
import CarouselCheTurnos from "./carousel2/CarouselCheTurnos";
import FAQ from "./faq/FAQ";

const Homepage = () => {
  return (
    <div>
      <UserNav/>
      <Carousel/>
      <OurStory/>
      <CarouselCheTurnos/>
      <Card/>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default Homepage
