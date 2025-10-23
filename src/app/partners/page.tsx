import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Partners | Mathebula Farm",
  description: "Our trusted partners and customers including Nason Foods, Farm Direct, restaurants, and government departments.",
};

export default function Partners() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full max-w-3xl mx-auto">
          <Image
            src="/partners.png"
            alt="Our partners"
            width={2400}
            height={1400}
            quality={100}
            sizes="(min-width: 1024px) 768px, (min-width: 768px) 600px, 100vw"
            className="w-full h-auto rounded-2xl shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}