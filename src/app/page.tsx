"use client";
import Link from "next/link";
import Stats from "@/components/Stats";
import Hero from "@/components/home/Hero";
import EggShowcase from "@/components/home/EggShowcase";
import VegetableShowcase from "@/components/home/VegetableShowcase";
import QualityCertifications from "@/components/home/QualityCertifications";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import GallerySection from "@/components/home/GallerySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/services/ServiceCard";
import HelpFarmerSection from "@/components/services/HelpFarmerSection";
import CommunityInitiatives from "@/components/services/CommunityInitiatives";
import DeliveryAreas from "@/components/services/DeliveryAreas";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <Stats />
        </div>
      </section>

      <EggShowcase />

      <VegetableShowcase />

      <FeaturedProducts />

      <QualityCertifications />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="What We Offer" 
            subtitle="Services designed for your success" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon="🚚"
              title="Door-to-Door Delivery"
              description="Fresh produce delivered right to your doorstep. Our reliable delivery service operates throughout greater Pretoria, ensuring your order arrives fresh, on time, every time."
              imageSrc="/delivary.jpg"
              imageAlt="Delivery truck"
              features={[
                "Same-day and next-day delivery options",
                "Temperature-controlled transport",
                "Flexible delivery schedules",
                "No minimum order for residential"
              ]}
            />

            <ServiceCard
              icon="🤝"
              title="Vendor Partnerships"
              description="Reliable supply partnerships for restaurants, retailers, and food businesses. Consistent quality, competitive pricing, and dependable delivery schedules."
              imageSrc="/groups-owners.jpg"
              imageAlt="Restaurant partnership"
              features={[
                "Bulk order discounts available",
                "Customized delivery schedules",
                "Quality consistency guaranteed",
                "Account management support"
              ]}
            />

            <ServiceCard
              icon="🌾"
              title="Help a Farmer Program"
              description="Supporting emerging farmers with training, resources, and market access. Join our community initiative to grow together."
              imageSrc="/training3.jpg"
              imageAlt="Farmer training"
              features={[
                "Free training workshops",
                "Market linkages provided",
                "Equipment access support",
                "Business development guidance"
              ]}
            />
          </div>
        </div>
      </section>

      <HelpFarmerSection />

      <CommunityInitiatives />

      <DeliveryAreas />

      <CustomerTestimonials />

      <GallerySection />

      <section className="py-20 bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Farm-Fresh Quality?</h2>
          <p className="text-xl mb-8">
            Whether you&apos;re a restaurant, retailer, or family - we deliver fresh produce straight to your door.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="bg-white text-amber-900 px-10 py-5 rounded-lg hover:bg-cream-50 transition-all font-bold text-lg shadow-lg">
              Place Your Order
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-10 py-5 rounded-lg hover:bg-amber-800 transition-colors font-bold text-lg">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}