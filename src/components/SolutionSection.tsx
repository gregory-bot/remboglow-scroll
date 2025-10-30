import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Palette, ShoppingBag } from 'lucide-react';

const SolutionSection = () => {
  const solutions = [
    {
      icon: <Camera className="w-12 h-12 text-[#e2b8e6]" />,
      title: "Face Analysis",
      description: "Platform finds your skin tone & face shape.",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Palette className="w-12 h-12 text-[#e2b8e6]" />,
      title: "Makeup Picks",
      description: "Get best shades for you.",
      bgColor: "bg-purple-50"
    },
    {
      icon: <ShoppingBag className="w-12 h-12 text-[#e2b8e6]" />,
      title: "Fashion",
      description: "Styles and products for your look.",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#e2b8e6] to-[#d8a5dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Solution
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Advanced Web3 technology meets personalized beauty recommendations for the perfect match.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                <div className={`${solution.bgColor} p-4 rounded-full`}>
                  {solution.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;