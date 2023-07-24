import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const ImageSlider = (props) => {
  const { img_urls } = props;
  const options = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  return (
    <div className="embla relative">
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
      <div className="flex gap-2 items-center mt-1 absolute bottom-3 ml-2">
        <button className="embla__prev flex justify-center items-center bg-slate-200 rounded-full p-1 hover:bg-slate-300 active:bg-slate-600 focus:outline-none focus:ring focus:ring-slate-400" onClick={scrollPrev}>
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          </span>
        </button>
        <button className="embla__next bg-slate-200 rounded-full p-1 hover:bg-slate-300 active:bg-slate-600 focus:outline-none focus:ring focus:ring-slate-400" onClick={scrollNext}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
