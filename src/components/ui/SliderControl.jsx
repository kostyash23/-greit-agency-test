export const SliderControl = ({ onClick, position, icon: Icon, label }) => (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-colors`}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
  