import { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Our Team | Mathebula Farm",
  description: "Meet the dedicated team behind Mathebula Farm, from leadership to operations staff.",
};

export default function Team() {
  const leadership = [
    {
      name: "Zifa Mathebula",
      role: "Managing Director",
      description: "Visionary leader driving sustainable farming practices and community development."
    },
    {
      name: "Thomas Mrali",
      role: "Operations Manager",
      description: "Ensures smooth daily operations and maintains our high-quality standards."
    },
    {
      name: "Boitumelo Moikangwe",
      role: "Marketing Manager",
      description: "Connects our farm with the community and manages customer relationships."
    }
  ];

  const supervisors = [
    {
      name: "Katleho",
      role: "Farm Supervisor",
      description: "Oversees daily farm activities and ensures animal welfare standards."
    },
    {
      name: "Tshepang",
      role: "Production Supervisor",
      description: "Manages production processes and quality control measures."
    }
  ];

  return (
    <div>
      <Hero
        title="Our Team"
        subtitle="Meet the passionate people behind Mathebula Farm"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Leadership Team" subtitle="Experienced leaders driving our mission forward" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <Card
                key={index}
                title={member.name}
                content={`${member.role} - ${member.description}`}
                icon="👤"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Farm Supervisors" subtitle="Hands-on management ensuring quality operations" />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {supervisors.map((member, index) => (
              <Card
                key={index}
                title={member.name}
                content={`${member.role} - ${member.description}`}
                icon="🧑‍🌾"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionTitle title="Supporting Staff" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of farm workers, maintenance staff, and administrative personnel 
            work tirelessly to ensure Mathebula Farm operates at the highest standards every day.
          </p>
        </div>
      </section>
    </div>
  );
}