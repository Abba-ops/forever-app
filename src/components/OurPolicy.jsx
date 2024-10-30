import { assets } from "../assets/assets";

export default function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-20 text-gray-700">
      <PolicyCard
        icon={assets.exchange_icon}
        title="Hassle-Free Exchange Policy"
        description="Enjoy a seamless exchange experience with our straightforward policy."
      />
      <PolicyCard
        icon={assets.quality_icon}
        title="7-Day Free Return Policy"
        description="Shop with confidence—return any item within 7 days at no extra cost."
      />
      <PolicyCard
        icon={assets.support_img}
        title="24/7 Customer Support"
        description="We're here for you around the clock with dedicated support at your service."
      />
    </div>
  );
}

function PolicyCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center">
      <img src={icon} className="w-12 mb-5" alt={title} />
      <p className="font-semibold text-base sm:text-lg">{title}</p>
      <p className="text-gray-400 text-xs sm:text-sm">{description}</p>
    </div>
  );
}
