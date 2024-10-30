import { useEffect } from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="About" text2="Forever" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          alt="about img"
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever is your trusted destination for a seamless online shopping
            experience. We bring together a curated selection of high-quality
            products, providing customers with choices that match their style
            and needs. From fashion and beauty to electronics and home
            essentials, Forever aims to cater to every aspect of your lifestyle.
          </p>
          <p>
            Since our launch, Forever has been dedicated to setting new
            standards in online retail, blending convenience with top-notch
            customer service. Our team works tirelessly to ensure that every
            order reflects our commitment to quality and customer satisfaction.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to revolutionize the e-commerce experience
            by offering products that enhance and simplify everyday life. We
            believe in providing value, quality, and an exceptional customer
            journey that keeps customers coming back. Every product is selected
            with care to ensure it meets our high standards.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1="Why" text2="Choose Forever" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        {[
          {
            title: "Quality Assurance",
            content:
              "At Forever, we prioritize quality above all. Each product undergoes meticulous checks to ensure it meets our stringent quality standards, ensuring that you receive only the best.",
          },
          {
            title: "Convenience",
            content:
              "Our platform is designed for ease of use, making it simple to find, select, and purchase the products you love. With secure payment options and efficient delivery, shopping with Forever is a breeze.",
          },
          {
            title: "Exceptional Customer Service",
            content:
              "Our dedicated customer service team is always ready to assist, from answering queries to resolving issues post-purchase. We value your satisfaction and work to make your shopping experience memorable.",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="border px-10 md:px-16 py-8 flex flex-col gap-5">
            <b>{section.title}:</b>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  );
}
