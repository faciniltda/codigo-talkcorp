import React from "react";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context("../../assets/advertise", false, /\.(png|jpe?g|svg)$/));

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    width: "100%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  image: {
    width: "100%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
  },
}));

const Carousel = () => {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className={classes.carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Propaganda ${index + 1}`} className={classes.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
