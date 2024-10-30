import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            We are committed to providing the best quality products and services
            to our customers. Our dedication to excellence has been our
            cornerstone since the beginning.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 uppercase">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="uppercase text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+243-455-6954</li>
            <li>forever@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; 2024 All rights reserved
        </p>
      </div>
    </footer>
  );
}
