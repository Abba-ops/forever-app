import { useEffect } from "react";
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsletterBox from "../components/NewsletterBox";
import OurPolicy from "../components/OurPolicy";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </>
  );
}
