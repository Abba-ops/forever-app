import { assets } from "../assets/assets";

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-8 md:w-11 h-[2px] bg-gray-700"></span>
            <p className="font-medium text-sm md:text-base uppercase">
              Our Bestsellers
            </p>
          </div>

          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-snug font-serif">
            Discover Our Latest Arrivals
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <p className="font-semibold text-sm md:text-base uppercase">
              Shop Now
            </p>
            <span className="w-8 md:w-11 h-[1px] bg-gray-700"></span>
          </div>
        </div>
      </div>

      <img
        src={assets.hero_img}
        className="w-full sm:w-1/2 object-cover"
        alt="Latest Arrivals"
      />
    </div>
  );
}
