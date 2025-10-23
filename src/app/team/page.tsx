import { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Our Team | Mathebula Farm",
  description: "Meet the dedicated team behind Mathebula Farm, from leadership to operations staff.",
};

export default function Team() {
  return (
    <div>
      <Hero
        title="Our Team"
        subtitle="Meet the passionate people behind Mathebula Farm"
      />

      {/* Team images section: two images side-by-side on md+ and stacked on mobile */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <Image
                src="/team-image.png"
                alt="Mathebula Farm team"
                width={2400}
                height={1600}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto rounded-2xl shadow-xl"
                quality={100}
                priority
              />
            </div>
            <div className="w-full">
              <Image
                src="/team-2.png"
                alt="Mathebula Farm team at work"
                width={2400}
                height={1600}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto rounded-2xl shadow-xl"
                quality={100}
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}