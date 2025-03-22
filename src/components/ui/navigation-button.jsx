export const NavigationButton = ({ onClick, disabled, children, ariaLabel }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );