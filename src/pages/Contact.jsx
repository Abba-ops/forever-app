import { useEffect } from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          alt="contact img"
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            5453 Willims Station <br />
            Suite 354, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (453) 555-0453 <br />
            Email: admin@forever.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings at our website
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}
