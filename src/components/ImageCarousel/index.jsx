import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./ImageCarousel.module.css";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      className={styles.carousel}
      showArrows
      showStatus={false}
      showThumbs={false}
    >
      {images.map((img, index) => (
        <div key={index} className={styles.carouselItem}>
          <img src={img} alt={`Carousel item ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
