import { useState } from 'react';
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { SpecialOffers } from "./components/SpecialOffers";
import { Footer } from "./components/Footer";
import { ProductDetail } from "./components/ProductDetail";
import { SearchResults } from "./components/SearchResults";
import { WeeklyDeals } from "./components/WeeklyDeals";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import type { Product } from "./contexts/ProductContext";


type AppView = 'home' | 'product' | 'search' | 'weekly-deals' | 'category';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleWeeklyDealsClick = () => {
    setCurrentView('weekly-deals');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('search');
  };

  const handleLogoClick = () => {
    handleBackToHome();
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'product':
        return selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToHome}
          />
        );
      
      case 'search':
        return (
          <SearchResults
            initialQuery={searchQuery}
            onProductClick={handleProductClick}
            onBack={handleBackToHome}
          />
        );
      
      case 'weekly-deals':
        return (
          <WeeklyDeals
            onProductClick={handleProductClick}
            onBack={handleBackToHome}
          />
        );
      
      case 'home':
      default:
        return (
          <main>
            <HeroSection />
            <CategoriesSection onCategoryClick={handleCategoryClick} />
            <FeaturedProducts onProductClick={handleProductClick} />
            <SpecialOffers />
          </main>
        );
    }
  };

  return (
    <ProductProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header 
            onLogoClick={handleLogoClick}
            onSearch={handleSearch}
            onWeeklyDealsClick={handleWeeklyDealsClick}
            onCategoryClick={handleCategoryClick}
          />
          
          {renderCurrentView()}
          
          {currentView === 'home' && <Footer />}
        </div>
      </CartProvider>
    </ProductProvider>
  );
}