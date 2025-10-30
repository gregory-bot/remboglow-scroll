import React from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Globe } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: <X className="w-16 h-16 text-pink-500" />,
      title: "Wrong Products",
      description: "Using the wrong products causes skin issues and health risks.",
      bgColor: "bg-pink-50"
    },
    {
      icon: <DollarSign className="w-16 h-16 text-green-500" />,
      title: "Trial & Error",
      description: "Wasting money on routines that don't work.",
      bgColor: "bg-green-50"
    },
    {
      icon: <Globe className="w-16 h-16 text-blue-500" />,
      title: "Cultural Relevance",
      description: "Lack of advice for African beauty needs.",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Problem face-fit Solves
          </h2>
          <div className="w-24 h-1 bg-[#e2b8e6] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the challenges in beauty and fashion that affect millions of people daily.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`${problem.bgColor} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;