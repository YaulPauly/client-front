'use client'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ImagenCarousel1 from '@/public/images/image_carousel-1.webp'
import ImagenCarousel2 from '@/public/images/image_carousel-2.webp'
import ImagenCarousel3 from '@/public/images/image_carousel-3.webp'
import Image from "next/image"
import styles from './carousel.module.css'

const Carousel = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings} className={styles.container_carousel}>
      <div className={styles.container_carousel__image}>
        <Image src={ImagenCarousel1}
          alt="imagen carousel 1" className={styles.carousel__image} priority/>
      </div>
      <div className={styles.container_carousel__image}>
        <Image src={ImagenCarousel2}
          alt="imagen carousel 2" className={styles.carousel__image} priority/>
      </div>
      <div className={styles.container_carousel__image}>
        <Image src={ImagenCarousel3}
          alt="imagen carousel 3" className={styles.carousel__image} priority/>
      </div>
    </Slider>
  );
}

export default Carousel;