import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Products & Services | Mathebula Farm",
  description: "A-grade table eggs and fresh seasonal vegetables. Quality certified, sustainably grown produce delivered to greater Pretoria.",
};

export default function Products() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="/eggs-hero.jpg"
          alt="Farm produce"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">Premium quality, sustainably produced</p>
        </div>
      </section>

      {/* Table Eggs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/eggs5.jpg"
                alt="Fresh table eggs"
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <div className="inline-block bg-amber-100 text-amber-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                BESTSELLER
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🥚 A-Grade Table Eggs</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our signature product. Produced by 5,000 healthy, free-range layers, each egg meets 
                strict A-grade quality standards. Collected daily for maximum freshness.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-4">Product Features:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span><strong>A-Grade Quality:</strong> Uniform size, clean shells, rich golden yolks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span><strong>Free-Range:</strong> Chickens roam naturally, leading to healthier eggs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span><strong>Daily Collection:</strong> Maximum 24-hour farm-to-customer freshness</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span><strong>Hormone-Free:</strong> Natural, healthy feed with no artificial additives</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Available in:</p>
                  <p className="font-bold text-gray-800">Trays of 30</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Bulk orders:</p>
                  <p className="font-bold text-gray-800">Contact for pricing</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-orange-500 transition-colors font-semibold"
              >
                Order Eggs Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Egg Gallery Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="Our Egg Production" 
            subtitle="From our healthy hens to your table - see the quality in every egg" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/eggs4.jpg"
                alt="Premium quality eggs"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Premium Quality</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/egges.jpg"
                alt="Fresh egg collection"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Daily Collection</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/eggegs.jpg"
                alt="Eggs on display"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">A-Grade Standard</p>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/egge-flyers.jpg"
                alt="Farm fresh eggs"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Farm Fresh</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/layers-chicken.jpg"
                  alt="Free-range layer chickens"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">🐔 Meet Our Layers</h3>
                <p className="text-gray-700 mb-4">
                  Our 5,000 healthy layer chickens roam freely in spacious, well-maintained facilities. 
                  They receive optimal nutrition and care, resulting in superior quality eggs with 
                  rich, golden yolks.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span>Free-range environment for natural behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span>Premium feed with no hormones or antibiotics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span>Regular veterinary care and health monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">✓</span>
                    <span>Clean, modern facilities with optimal conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Produce Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Fresh Seasonal Vegetables" subtitle="Grown with care, harvested at peak freshness" />
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/spinash3.jpg"
                  alt="Fresh spinach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">🥬 Spinach</h3>
                <p className="text-gray-600 mb-4">
                  Dark green, nutrient-rich leaves. High in iron, vitamins A, C, and K. Perfect for 
                  salads, smoothies, and cooking.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Available year-round</p>
                  <p>• Sold per kg</p>
                  <p>• Bulk discounts available</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/spinash4.jpg"
                  alt="Fresh beetroot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">🥕 Beetroot</h3>
                <p className="text-gray-600 mb-4">
                  Sweet, earthy root vegetable. Packed with antioxidants and natural nitrates. 
                  Great roasted, pickled, or raw.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Seasonal availability</p>
                  <p>• Fresh or pre-washed</p>
                  <p>• Restaurant-quality grade</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80"
                  alt="Colorful peppers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">🌶️ Bell Peppers</h3>
                <p className="text-gray-600 mb-4">
                  Crisp, colorful peppers in red, yellow, and green. High in vitamin C and 
                  antioxidants. Versatile for any cuisine.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Multiple color varieties</p>
                  <p>• Peak season: Summer</p>
                  <p>• Perfect for grilling</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Seasonal Produce</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Available Throughout the Year:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tomatoes - vine-ripened and flavorful</li>
                  <li>• Lettuce - crisp and fresh varieties</li>
                  <li>• Carrots - sweet and crunchy</li>
                  <li>• Onions - red and white varieties</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Seasonal Specials:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Butternut squash (Winter)</li>
                  <li>• Green beans (Summer)</li>
                  <li>• Broccoli (Spring/Fall)</li>
                  <li>• Cauliflower (Cool seasons)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Quality You Can Trust" />
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold mb-2">B-BBEE Level 1</h3>
              <p className="text-sm text-gray-600">Certified transformation leader</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-bold mb-2">Quality Tested</h3>
              <p className="text-sm text-gray-600">Every batch inspected</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-bold mb-2">Sustainable</h3>
              <p className="text-sm text-gray-600">Eco-friendly practices</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold mb-2">Fresh Delivery</h3>
              <p className="text-sm text-gray-600">Farm to table in 24hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Information */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-xl mb-8">
            We supply restaurants, retailers, and direct to families throughout greater Pretoria.
            Contact us for pricing, delivery schedules, and bulk order discounts.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-sm opacity-90 mb-1">Call Us</p>
              <p className="font-bold text-lg">+27 73 523 0659</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Email Us</p>
              <p className="font-bold text-lg">info@mathebulafarm.co.za</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Delivery Areas</p>
              <p className="font-bold text-lg">Greater Pretoria</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors font-semibold"
          >
            Place Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}