export const SliderDots = ({ totalImages, currentIndex, setCurrentIndex }) => (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: totalImages }).map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentIndex(index);
          }}
          className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
);