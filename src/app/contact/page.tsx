"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Hero
        title="Contact Us"
        subtitle="Get in touch for orders, partnerships, or any questions"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionTitle title="Send us a Message" centered={false} />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 min-h-32"
                    placeholder="Tell us about your requirements, questions, or how we can help you..."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 hover:from-amber-600 hover:via-amber-500 hover:to-orange-500">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <SectionTitle title="Get in Touch" centered={false} />
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-amber-700 text-xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Farm Location</h4>
                    <p className="text-gray-600">
                      Honingnestkrans<br />
                      North of Pretoria<br />
                      South Africa
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-amber-700 text-xl">📞</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <a href="tel:+27735230659" className="text-gray-600 hover:text-amber-700">
                      +27 73 523 0659
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-amber-700 text-xl">✉️</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <a href="mailto:info@mathebulafarm.co.za" className="text-gray-600 hover:text-amber-700">
                      info@mathebulafarm.co.za
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-amber-700 text-xl">🕒</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 7:00 AM - 5:00 PM<br />
                      Saturday: 7:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}