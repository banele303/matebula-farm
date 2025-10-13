import { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import Timeline from "@/components/Timeline";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Our Story | Mathebula Farm",
  description: "The journey of Mathebula Farm from establishment to our vision of 50,000 layers. Youth innovation and sustainable farming.",
};

export default function Story() {
  const milestones = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Mathebula Farm was established with a dream to create sustainable farming solutions for our community."
    },
    {
      year: "2020",
      title: "First 1,000 Layers",
      description: "Started operations with our first flock, learning and adapting to provide quality eggs."
    },
    {
      year: "2022",
      title: "Expansion to 5,000",
      description: "Scaled operations to 5,000 layers, meeting growing demand and improving efficiency."
    },
    {
      year: "2024",
      title: "Present Day",
      description: "Operating at full capacity with established market presence and community programs."
    },
    {
      year: "2026",
      title: "Future Vision",
      description: "Goal to expand to 50,000 layers, becoming a major regional supplier while maintaining quality."
    }
  ];

  return (
    <div>
      <Hero
        title="Our Story"
        subtitle="From humble beginnings to sustainable growth"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="Our Journey" 
            subtitle="A timeline of growth, learning, and community impact"
          />
          <Timeline items={milestones} />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="What Drives Us" />
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card
              icon="🌱"
              title="Sustainable Farming"
              content="We believe in farming practices that protect our environment while producing quality food. Our methods focus on soil health, water conservation, and animal welfare."
            />
            <Card
              icon="👥"
              title="Youth Innovation"
              content="Empowering young farmers with modern techniques and technology. We're passionate about showing youth that agriculture is a viable and rewarding career path."
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Looking Forward" />
          
          <div className="bg-amber-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">Our 2026 Vision</h3>
            <p className="text-lg text-gray-700 mb-6">
              Expanding to 50,000 layers while maintaining our commitment to quality, sustainability, 
              and community development. We aim to become a regional leader in responsible farming.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-3xl font-bold text-amber-700">50,000</p>
                <p className="text-sm text-gray-600">Target Layers</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-3xl font-bold text-amber-700">10x</p>
                <p className="text-sm text-gray-600">Growth Factor</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-3xl font-bold text-amber-700">100+</p>
                <p className="text-sm text-gray-600">Jobs Created</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}