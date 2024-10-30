import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

export default function StarRating({ value, text, size = 24 }) {
  const renderStarIcon = (num) => {
    if (value >= num) {
      return <RiStarFill key={num} size={size} className="text-[#ffae42]" />;
    } else if (value >= num - 0.5) {
      return (
        <RiStarHalfFill key={num} size={size} className="text-[#ffae42]" />
      );
    } else {
      return <RiStarLine key={num} size={size} className="text-[#ffae42]" />;
    }
  };

  const stars = [1, 2, 3, 4, 5].map(renderStarIcon);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1 text-[#ffae42]">{stars}</div>
      {text && <span className="text-gray-700">{text}</span>}
    </div>
  );
}
