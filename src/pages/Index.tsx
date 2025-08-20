import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
