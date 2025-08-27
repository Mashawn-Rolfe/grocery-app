import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { SpecialOffers } from "./components/SpecialOffers";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <SpecialOffers />
      </main>
      <Footer />
    </div>
  );
}

export default App
