import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Shield, Lock } from 'lucide-react';
import { useAccount } from 'wagmi';
import { ConnectWalletButton } from './ConnectWalletButton';
import { UploadCreditDisplay } from './UploadCreditDisplay';
import { ClaimFreeCreditsButton } from './ClaimFreeCreditsButton';

const UploadSection = () => {
  const { isConnected } = useAccount();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-[#e2b8e6] to-[#d8a5dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            ✨ Try it out, Upload Your Photo
          </h2>
          <p className="text-xl text-white/90 mb-2">
            First 2 photos are free. Additional uploads cost $5 USDC.
          </p>
          {!isConnected && (
            <p className="text-lg text-white/80">
              Connect your wallet to get started with 2 free uploads!
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              {!isConnected ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <ConnectWalletButton />
                  </div>
                  <p className="text-white/80 mb-4">
                    Connect your Web3 wallet to start uploading photos
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Secure Web3 Storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Private & Encrypted</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-white bg-white/20' 
                      : 'border-white/50 hover:border-white hover:bg-white/10'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Camera className="w-16 h-16 text-white/80 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Choose Your Photo
                  </h3>
                  <p className="text-white/80 mb-4">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-white/60 mb-6">
                    PNG, JPG up to 5MB
                  </p>
                  <button className="bg-black text-[#e2b8e6] px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors duration-300">
                    Select Photo
                  </button>
                </div>
              )}

              {/* Web3 Security Features */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white font-medium">Blockchain Secured</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white font-medium">Private Storage</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white font-medium">AI Analysis</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Credits Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <UploadCreditDisplay />
            </motion.div>
            
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ClaimFreeCreditsButton />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;