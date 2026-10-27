import home from "@/data/home.json";
import reviews from "@/data/reviews.json";
import faq from "@/data/faq.json";

import Hero from "@/components/sections/Hero";
import CategoryRow from "@/components/sections/CategoryRow";
import PromoBanner from "@/components/sections/PromoBanner";
import BestSellers from "@/components/sections/BestSellers";
import FeatureStrip from "@/components/sections/FeatureStrip";
import FaqSection from "@/components/sections/FaqSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
export default function HomePage() {
  return (
    <>
      <Hero data={home.hero} />
      <CategoryRow data={home.categoriesSection} />
      <BestSellers data={home.bestSellers} />
      <PromoBanner data={home.offerBanner} />
      <ReviewsSection data={reviews} />
      <FaqSection data={faq} />
      <FeatureStrip items={home.features} />
    </>
  );
}
