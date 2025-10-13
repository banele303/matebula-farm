import { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Partners | Mathebula Farm",
  description: "Our trusted partners and customers including Nason Foods, Farm Direct, restaurants, and government departments.",
};

export default function Partners() {
  const suppliers = [
    {
      name: "Nason Foods",
      description: "Premium food supplier providing quality ingredients and farming supplies.",
      type: "Supplier"
    },
    {
      name: "Farm Direct",
      description: "Agricultural equipment and direct marketing solutions provider.",
      type: "Supplier"
    },
    {
      name: "Mekyda Eggs",
      description: "Egg distribution and packaging partner for retail markets.",
      type: "Distributor"
    },
    {
      name: "Dept. of Agriculture & Rural Development",
      description: "Government partner supporting sustainable farming initiatives.",
      type: "Government"
    }
  ];

  const customers = [
    {
      name: "Kung-Fu Kitchen",
      description: "Popular restaurant chain serving fresh farm-to-table cuisine.",
      type: "Restaurant"
    },
    {
      name: "Oppiplaas",
      description: "Farm-style restaurant featuring local produce and traditional dishes.",
      type: "Restaurant"
    },
    {
      name: "Living Water Lodge",
      description: "Boutique lodge committed to serving guests fresh, local ingredients.",
      type: "Hospitality"
    },
    {
      name: "Felo Restaurant & Bar",
      description: "Contemporary dining establishment emphasizing quality ingredients.",
      type: "Restaurant"
    }
  ];

  return (
    <div>
      <Hero
        title="Our Partners"
        subtitle="Building strong relationships across the agricultural value chain"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="Supply Partners" 
            subtitle="Trusted partners who help us maintain quality and efficiency"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            {suppliers.map((partner, index) => (
              <Card
                key={index}
                title={partner.name}
                content={`${partner.description}\n\nPartnership Type: ${partner.type}`}
                icon={partner.type === "Government" ? "🏛️" : partner.type === "Distributor" ? "🚛" : "🤝"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="Our Customers" 
            subtitle="Restaurants and establishments we&apos;re proud to serve"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            {customers.map((customer, index) => (
              <Card
                key={index}
                title={customer.name}
                content={`${customer.description}\n\nBusiness Type: ${customer.type}`}
                icon={customer.type === "Restaurant" ? "🍽️" : "🏨"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Partnership Benefits" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card
              icon="🎯"
              title="Reliable Supply"
              content="Consistent delivery schedules and quality standards that our partners can depend on."
            />
            <Card
              icon="💰"
              title="Competitive Pricing"
              content="Fair pricing structures with volume discounts for long-term partnership agreements."
            />
            <Card
              icon="🌟"
              title="Quality Assurance"
              content="Rigorous quality control processes ensuring every product meets our high standards."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionTitle title="Become a Partner" />
          
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Interested in partnering with Mathebula Farm? We&apos;re always looking for 
              quality-focused businesses to join our network.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-amber-700">📞</span>
                <span>+27 73 523 0659</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-amber-700">✉️</span>
                <span>info@mathebulafarm.co.za</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-orange-500 transition-colors"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}