import React from 'react';
import { motion } from 'framer-motion';
import { Upload, CreditCard, Lightbulb, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: <Upload className="w-12 h-12 text-white" />,
      title: "Upload",
      description: "Upload your photo for analysis",
      bgColor: "bg-blue-500",
      iconBg: "bg-blue-100"
    },
    {
      number: "2", 
      icon: <CreditCard className="w-12 h-12 text-white" />,
      title: "Pay",
      description: "Secure Web3 payment for premium insights",
      bgColor: "bg-green-500",
      iconBg: "bg-green-100"
    },
    {
      number: "3",
      icon: <Lightbulb className="w-12 h-12 text-white" />,
      title: "Get Insights",
      description: "Receive personalized recommendations and linked to products",
      bgColor: "bg-purple-500",
      iconBg: "bg-purple-100"
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
            How It Works
          </h2>
          <div className="w-24 h-1 bg-[#e2b8e6] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to discover your perfect beauty and fashion match with Web3 security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#e2b8e6] text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {step.number}
                </div>
                
                {/* Icon Circle */}
                <div className={`${step.bgColor} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-center items-center">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;