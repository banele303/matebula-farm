import SectionTitle from "@/components/SectionTitle";

interface Initiative {
  icon: string;
  title: string;
  description: string;
}

export default function CommunityInitiatives() {
  const initiatives: Initiative[] = [
    {
      icon: "🏫",
      title: "School Programs",
      description: "Farm tours and educational sessions teaching students about sustainable agriculture, nutrition, and where food comes from."
    },
    {
      icon: "👨‍🏫",
      title: "Workshops",
      description: "Community workshops on urban farming, composting, nutrition, and healthy eating for all ages and skill levels."
    },
    {
      icon: "🌱",
      title: "Youth Programs",
      description: "Inspiring the next generation of farmers through internships, mentorship, and hands-on learning experiences."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Community Initiatives" 
          subtitle="Education and outreach programs" 
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-5xl mb-4">{initiative.icon}</div>
              <h3 className="text-xl font-bold mb-3">{initiative.title}</h3>
              <p className="text-gray-600">{initiative.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
