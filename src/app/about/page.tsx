import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "About Us | Mathebula Farm",
  description: "Learn about Mathebula Farm's journey, mission, and B-BBEE Level 1 certification. Community-focused farming since 2019.",
};

export default function About() {
  const timeline = [
    {
      year: "2019",
      title: "Farm Establishment",
      description: "Mathebula Farm was founded in Honingnestkrans with a vision to provide quality produce and create sustainable employment."
    },
    {
      year: "2020",
      title: "First Harvest & Growth",
      description: "Successfully produced our first batch of A-grade table eggs with 1,000 layers. Began vegetable cultivation."
    },
    {
      year: "2021",
      title: "Expansion to 3,000 Layers",
      description: "Tripled capacity based on market demand. Established partnerships with local restaurants and retailers."
    },
    {
      year: "2022",
      title: "B-BBEE Level 1 Certification",
      description: "Achieved B-BBEE Level 1 certification, demonstrating our commitment to transformation and empowerment."
    },
    {
      year: "2023",
      title: "Reached 5,000 Layers",
      description: "Hit major milestone with 5,000 active layers. Launched door-to-door delivery service across Pretoria."
    },
    {
      year: "2024",
      title: "Help a Farmer Program",
      description: "Launched community initiative supporting emerging farmers with training, resources, and market access."
    },
    {
      year: "2026",
      title: "Vision: 50,000 Layers",
      description: "Goal to become regional leader with 50,000 layers while maintaining quality and sustainability standards."
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[500px] flex items-center">
        <Image
          src="/plot-hero.jpg"
          alt="Mathebula Farm"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 text-white z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Mathebula Farm</h1>
          <p className="text-2xl mb-4">Building sustainable farming practices with community at heart</p>
          <p className="text-lg max-w-2xl">
            Since 2019, we've been dedicated to producing quality eggs and vegetables while creating 
            opportunities and supporting our community in Honingnestkrans, North of Pretoria.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-8 rounded-lg">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To provide fresh, quality produce through sustainable farming practices while 
                empowering our community and creating lasting economic opportunities for local farmers.
              </p>
            </div>
            
            <div className="bg-amber-50 p-8 rounded-lg">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the leading sustainable farm in the region, growing from 5,000 to 50,000 layers 
                by 2026 while maintaining our commitment to quality and community development.
              </p>
            </div>
            
            <div className="bg-amber-50 p-8 rounded-lg">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Values</h3>
              <p className="text-gray-700">
                Quality, sustainability, community, integrity, and innovation guide everything we do. 
                We believe in farming that nourishes both people and planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Our Journey" subtitle="From humble beginnings to transformative impact" />
          <Timeline items={timeline} />
        </div>
      </section>

      {/* B-BBEE Certification */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl bg-gray-100">
              <Image
                src="/owner.jpg"
                alt="B-BBEE Certification"
                fill
                className="object-cover object-center"
                style={{ objectPosition: '50% 20%' }}
              />
            </div>
            
            <div>
              <div className="inline-block bg-gradient-to-r from-amber-700 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                CERTIFIED
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🏆 B-BBEE Level 1 Certified</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're proud to hold B-BBEE Level 1 certification, the highest level of Broad-Based Black 
                Economic Empowerment recognition in South Africa.
              </p>
              
              <h3 className="font-bold text-xl mb-3">What This Means:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-amber-700 mt-1">✓</span>
                  <span><strong>Economic Transformation:</strong> We actively contribute to redressing economic inequality</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-700 mt-1">✓</span>
                  <span><strong>Skills Development:</strong> Investment in training and developing our workforce</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-700 mt-1">✓</span>
                  <span><strong>Enterprise Development:</strong> Supporting emerging farmers through our programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-700 mt-1">✓</span>
                  <span><strong>Socio-Economic Development:</strong> Community projects and job creation initiatives</span>
                </li>
              </ul>
              
              <p className="text-gray-600 italic">
                Partnering with Mathebula Farm means working with a verified transformation leader 
                committed to inclusive economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Egg Production Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="Quality Egg Production" 
            subtitle="From our farm to your table - excellence at every step" 
          />
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/eggs4.jpg"
                alt="Fresh eggs"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold text-lg">Premium Quality</h4>
                  <p className="text-sm">A-grade certified eggs</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/chicken-layers2.jpg"
                alt="Free-range chickens"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold text-lg">Happy Hens</h4>
                  <p className="text-sm">5,000 free-range layers</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/egges.jpg"
                alt="Daily collection"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold text-lg">Daily Fresh</h4>
                  <p className="text-sm">Collected every morning</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🥚 Why Our Eggs Stand Out
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 text-xl">✓</span>
                    <div>
                      <strong className="text-gray-900">Free-Range Environment:</strong>
                      <p className="text-gray-600">Our chickens roam freely, resulting in healthier, tastier eggs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 text-xl">✓</span>
                    <div>
                      <strong className="text-gray-900">Rich Golden Yolks:</strong>
                      <p className="text-gray-600">Premium feed produces vibrant, nutrient-rich yolks</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 text-xl">✓</span>
                    <div>
                      <strong className="text-gray-900">24-Hour Freshness:</strong>
                      <p className="text-gray-600">From collection to delivery within one day</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-700 text-xl">✓</span>
                    <div>
                      <strong className="text-gray-900">A-Grade Certified:</strong>
                      <p className="text-gray-600">Every egg meets strict quality standards</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/eggs-hero.jpg"
                  alt="Fresh farm eggs"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help a Farmer Program */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🤝 Help a Farmer Program</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our flagship community initiative empowering emerging farmers with the tools, 
              knowledge, and support they need to succeed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3">Training & Education</h3>
              <p>
                Comprehensive training programs covering modern farming techniques, sustainable practices, 
                business management, and quality control standards.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-5xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-3">Resources & Support</h3>
              <p>
                Access to farming equipment, quality seeds and inputs, technical advisory services, 
                and ongoing mentorship from experienced farmers.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold mb-3">Market Access</h3>
              <p>
                Connecting farmers with buyers, retailers, and restaurants. Assistance with pricing, 
                packaging, and distribution channels.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl mb-6">Interested in joining our program or partnering with us?</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors font-semibold"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Our Impact" subtitle="Making a difference in our community" />
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">5,000+</div>
              <p className="text-gray-700">Active Egg-Laying Hens</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">50+</div>
              <p className="text-gray-700">Direct Jobs Created</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">100+</div>
              <p className="text-gray-700">Daily Customers Served</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">20+</div>
              <p className="text-gray-700">Farmers Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team Behind Mathebula Farm</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our success is driven by a passionate, dedicated team committed to sustainable farming 
            and community development. Get to know the people making it happen.
          </p>
          <Link
            href="/team"
            className="inline-block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-orange-500 transition-colors font-semibold"
          >
            Meet Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}