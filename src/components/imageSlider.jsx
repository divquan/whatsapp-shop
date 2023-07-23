import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const ImageSlider = (props) => {
  const { img_urls } = props;
  const options = { loop: true };
  const [emblaRef] = useEmblaCarousel(options);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {img_urls?.map((img_url, index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={img_url}
                alt="image of product"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
