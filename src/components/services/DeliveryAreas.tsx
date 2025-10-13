import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

export default function DeliveryAreas() {
  const currentAreas = [
    "Pretoria North",
    "Pretoria Central",
    "Pretoria East",
    "Centurion",
    "Honingnestkrans",
    "Mabopane",
    "Ga-Rankuwa",
    "Soshanguve"
  ];

  const expansionAreas = [
    "Pretoria West",
    "Sandton",
    "Midrand",
    "Johannesburg North"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Delivery Coverage" 
          subtitle="Serving greater Pretoria and expanding" 
        />
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Current Delivery Areas */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-amber-900 mb-6">
              Current Delivery Areas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {currentAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-amber-700">✓</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t">
              <h4 className="font-semibold mb-3">Delivery Schedule:</h4>
              <p className="text-gray-600 mb-2">Monday - Friday: 7AM - 6PM</p>
              <p className="text-gray-600">Saturday: 7AM - 2PM</p>
            </div>
          </div>
          
          {/* Expansion Plans */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Expansion Plans
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re constantly working to expand our delivery network. Coming soon to these areas:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {expansionAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-orange-500">⏳</span>
                  <span className="text-gray-600">{area}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Want delivery in your area?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Let us know! We prioritize expansion based on customer demand.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-amber-700 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-500 transition-colors text-sm font-semibold"
              >
                Request Your Area
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
