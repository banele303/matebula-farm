import Link from "next/link";
import Image from "next/image";

export default function HelpFarmerSection() {
  const stats = [
    { value: "20+", label: "Farmers Helped" },
    { value: "50+", label: "Training Sessions" },
    { value: "100%", label: "Success Rate" }
  ];

  const benefits = [
    {
      icon: "📚",
      title: "Training & Education",
      description: "Comprehensive workshops covering sustainable farming practices, integrated pest management, soil health improvement techniques, crop rotation strategies, and business planning for agricultural success"
    },
    {
      icon: "🛠️",
      title: "Resources & Equipment",
      description: "Access to farming tools, quality seeds, fertilizers, and technical advisory services"
    },
    {
      icon: "🏪",
      title: "Market Linkages",
      description: "Direct connections to restaurants, retailers, and customers seeking fresh produce"
    },
    {
      icon: "💰",
      title: "Financial Guidance",
      description: "Support with pricing strategies, cost management, and accessing funding opportunities"
    }
  ];

  const trainingPrograms = [
    {
      title: "Sustainable Farming Practices",
      description: "Learn eco-friendly techniques including water conservation, organic farming methods, composting, and natural resource management",
      image: "/plot3.jpg",
      duration: "4 weeks"
    },
    {
      title: "Pest Management",
      description: "Master integrated pest control strategies using biological controls, companion planting, and minimal chemical intervention for healthier crops",
      image: "/spinash-hero.jpg",
      duration: "3 weeks"
    },
    {
      title: "Soil Health & Nutrition",
      description: "Understand soil testing, nutrient management, pH balancing, and building fertile soil through natural amendments",
      image: "/plot-hero.jpg",
      duration: "3 weeks"
    },
    {
      title: "Business Planning & Marketing",
      description: "Develop business plans, learn pricing strategies, customer acquisition, bookkeeping, and digital marketing for your farm",
      image: "/groups-owners.jpg",
      duration: "5 weeks"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-brown-800 to-orange-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">🌾 Help a Farmer Program</h2>
            <p className="text-xl mb-6">
              Our flagship community initiative empowering emerging farmers with the resources, 
              training, and market access they need to thrive.
            </p>
            <p className="mb-8">
              Since launching in 2024, we&apos;ve supported over 20 local farmers, providing them with 
              modern farming techniques, quality inputs, and direct connections to buyers. Together, 
              we&apos;re building a stronger, more sustainable agricultural community.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <Link
              href="/contact"
              className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors font-semibold shadow-lg"
            >
              Join the Program
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Program Benefits</h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{benefit.icon}</div>
                    <h4 className="text-xl font-bold">{benefit.title}</h4>
                  </div>
                  <p className="text-sm opacity-90 ml-12">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Programs Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">🎓 Training & Education Programs</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive workshops designed to equip farmers with practical skills and knowledge for long-term success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Large Hero Image */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/more.jpg"
                alt="Farmer training workshop"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h4 className="text-3xl font-bold mb-3">Empowering Farmers Through Education</h4>
                <p className="text-lg opacity-90">
                  Join our comprehensive training programs and transform your farming practices with expert guidance and hands-on learning.
                </p>
              </div>
            </div>

            {/* Right - Training Program Cards */}
            <div className="space-y-4">
              {trainingPrograms.map((program, index) => (
                <div 
                  key={index} 
                  className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-amber-900 flex-1">{program.title}</h4>
                    <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md ml-3 flex-shrink-0">
                      {program.duration}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{program.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Certificate upon completion</span>
                    <span className="text-amber-700 font-semibold text-sm">Free for participants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 inline-block">
              <h4 className="text-2xl font-bold mb-4">Ready to Transform Your Farm?</h4>
              <p className="mb-6 opacity-90">
                Applications for our next training cohort are now open. Limited spots available!
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors font-semibold shadow-lg"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
