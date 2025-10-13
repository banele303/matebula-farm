import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/services/ServiceCard";
import HelpFarmerSection from "@/components/services/HelpFarmerSection";
import CommunityInitiatives from "@/components/services/CommunityInitiatives";
import DeliveryAreas from "@/components/services/DeliveryAreas";

export const metadata: Metadata = {
  title: "Services | Mathebula Farm",
  description: "Door-to-door delivery, vendor partnerships, and community programs. Help a Farmer initiative supporting local development.",
};

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="/eggegs.jpg"
          alt="Delivery services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl">Comprehensive solutions for fresh produce and community support</p>
        </div>
      </section>

      {/* Main Services */}
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Whether you need fresh produce delivered, want to partner with us, or are interested 
            in our Help a Farmer program - we're here to help.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors font-semibold"
            >
              Contact Us Today
            </Link>
            <Link
              href="/products"
              className="border-2 border-white px-8 py-4 rounded-lg hover:bg-white hover:text-amber-900 transition-colors font-semibold"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}