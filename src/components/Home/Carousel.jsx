import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <Slider {...settings}>
      <div>
        <Link to="">
          <img
            className="lg:rounded-lg"
            src="https://icms-image.slatic.net/images/ims-web/1efc693a-1ac9-4a0e-9134-c87d023fb499.jpg"
            alt="Slide 1"
          />
        </Link>
      </div>
      <div>
        <Link to="">
          <img
            className="lg:rounded-lg"
            src="https://icms-image.slatic.net/images/ims-web/c251bbde-44be-473c-9ca3-5eaefe155700.jpg"
            alt="Slide 2"
          />
        </Link>
      </div>
      <div>
        <Link to="">
          <img
            className="lg:rounded-lg"
            src="https://icms-image.slatic.net/images/ims-web/ae885bfa-c945-4eba-a622-27b574a428a4.jpg_1200x1200.jpg"
            alt="Slide 3"
          />
        </Link>
      </div>
      <div>
        <Link to="">
          <img
            className="lg:rounded-lg"
            src="https://icms-image.slatic.net/images/ims-web/ea9ce1b9-cbb8-4eb3-83f5-e3b27ab65d1b.jpg"
            alt="Slide 4"
          />
        </Link>
      </div>
    </Slider>
  );
};

export default Carousel;
