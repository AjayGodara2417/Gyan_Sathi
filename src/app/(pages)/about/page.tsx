import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[#F6FDF8] text-gray-900 px-6 md:px-20 py-2 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-green-600">Gyan Saathi</span>
          </h1>

          <p className="text-lg mb-4 leading-relaxed">
            Welcome to <strong>Gyan Saathi</strong>, your trusted companion in
            the journey of education and learning. Our mission is to provide
            quality educational resources and tools to help students and
            educators achieve their goals.
          </p>

          <p className="text-lg mb-4 leading-relaxed">
            We believe that knowledge is the key to success, and we’re committed
            to making learning accessible, engaging, and effective for everyone.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Our Vision</h2>
          <p className="text-lg mb-4 leading-relaxed">
            To empower learners and educators with innovative solutions that
            foster growth and excellence in education.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions or need assistance, feel free to reach out
            at {" "}
            <a
              href="mailto:support@gyansathi.com"
              className="text-green-600 underline"
            >
              support@gyansathi.com
            </a>
            .
          </p>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center md:justify-end">
          <Image
            className="rounded-xl transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
            src="/group.jpg"
            width={700}
            height={350}
            alt="Student discussion"
          />
        </div>
      </div>
    </div>
  );
}
