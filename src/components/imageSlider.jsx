import { useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./ui/Icons";
import { SliderControl } from "./ui/SliderControl";
import { SliderDots } from "./ui/SliderDots";
export default function ImageSlider({ images = [] }) {
  const validImages = images.length > 0 ? images : ["https://www.svgrepo.com/show/508699/landscape-placeholder.svg"];
  const totalImages = validImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const goToPrevious = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  }, [totalImages]);

  const goToNext = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  }, [totalImages]);


  return (
    <div
      className="relative h-64 w-full"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="h-full w-full relative">
        <img
          src={validImages[currentIndex]}
          alt="Property"
          className="object-cover w-full h-full"
        />
      </div>

      {totalImages > 1 && <SliderDots totalImages={totalImages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />}

      {showControls && totalImages > 1 && (
        <>
          <SliderControl onClick={goToPrevious} position="left-2" icon={ChevronLeftIcon} label="Previous image" />
          <SliderControl onClick={goToNext} position="right-2" icon={ChevronRightIcon} label="Next image" />
        </>
      )}
    </div>
  );
}
