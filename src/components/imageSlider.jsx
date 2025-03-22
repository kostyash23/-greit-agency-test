
import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "./ui/Icons"



export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const totalImages = images.length
  const displayImages = images.length > 0 ? images : ["https://www.svgrepo.com/show/508699/landscape-placeholder.svg"]

  const goToPrevious = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1))
  }

  const goToNext = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div
      className="relative h-64 w-full"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="h-full w-full relative">
        <img
          src={displayImages[currentIndex] || "/placeholder.svg"}
          alt="Property"
          className="object-cover w-full h-full"
        />
      </div>

      {totalImages > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showControls && totalImages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}
