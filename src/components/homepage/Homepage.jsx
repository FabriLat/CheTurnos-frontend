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
      <Carousel/>
      <OurStory/>
      <CarouselCheTurnos/>
      <Card/>
      <FAQ/>
    </div>
  )
}

export default Homepage
