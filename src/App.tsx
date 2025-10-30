import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Web3Provider } from './components/Web3Provider';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
import UploadSection from './components/UploadSection';
import { PurchaseCreditsButton } from './components/PurchaseCreditsButton';
import { NFTMinter } from './components/NFTMinter';
import { Coins, Image as ImageIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'credits' | 'nft'>('credits');

  return (
    <Web3Provider>
      <div className="min-h-screen">
        <Header />
        
        <main id="home">
          <Hero />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <UploadSection />

          {/* Additional Features Section */}
          <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Web3 Features
                </h2>
                <div className="w-24 h-1 bg-[#e2b8e6] mx-auto mb-6"></div>
              </motion.div>

              {/* Tab Navigation */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setActiveTab('credits')}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === 'credits'
                        ? 'bg-[#e2b8e6] text-white'
                        : 'text-gray-600 hover:text-[#e2b8e6]'
                    }`}
                  >
                    <Coins className="w-4 h-4 inline mr-2" />
                    Buy Credits
                  </button>
                  <button
                    onClick={() => setActiveTab('nft')}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === 'nft'
                        ? 'bg-[#e2b8e6] text-white'
                        : 'text-gray-600 hover:text-[#e2b8e6]'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 inline mr-2" />
                    Mint NFT
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {activeTab === 'credits' && (
                  <>
                    <div className="lg:col-span-3">
                      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <Coins className="w-6 h-6 text-[#e2b8e6]" />
                          Purchase Upload Credits
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { credits: 1, price: 5, popular: false },
                            { credits: 5, price: 20, popular: true },
                            { credits: 10, price: 35, popular: false },
                          ].map(({ credits, price, popular }) => (
                            <div
                              key={credits}
                              className={`border-2 rounded-xl p-6 text-center relative transition-all duration-300 hover:shadow-lg ${
                                popular
                                  ? 'border-[#e2b8e6] bg-gradient-to-br from-[#e2b8e6]/10 to-[#d8a5dc]/10'
                                  : 'border-gray-200 bg-white hover:border-[#e2b8e6]/50'
                              }`}
                            >
                              {popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#e2b8e6] text-white px-4 py-1 rounded-full text-sm font-bold">
                                  Most Popular
                                </div>
                              )}
                              
                              <div className="text-4xl font-bold text-gray-900 mb-2">
                                {credits}
                              </div>
                              <div className="text-gray-600 mb-4">
                                {credits === 1 ? 'Upload' : 'Uploads'}
                              </div>
                              <div className="text-3xl font-bold text-[#e2b8e6] mb-4">
                                ${price}
                              </div>
                              <div className="text-sm text-gray-500 mb-6">
                                ${(price / credits).toFixed(2)} per upload
                              </div>
                              
                              <PurchaseCreditsButton creditsAmount={credits} />
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-[#e2b8e6]/10 to-[#d8a5dc]/10 border border-[#e2b8e6]/20 rounded-xl">
                          <h4 className="font-bold text-gray-900 mb-3">Web3 Payment Benefits:</h4>
                          <ul className="text-gray-700 space-y-2">
                            <li>• Secure payments processed on Base blockchain</li>
                            <li>• USDC token payments (get testnet USDC from faucet)</li>
                            <li>• Credits never expire and are stored on-chain</li>
                            <li>• Your photos remain private and encrypted</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'nft' && (
                  <>
                    <div className="lg:col-span-3">
                      <NFTMinter />
                    </div>
                    
                    <div>
                      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-[#e2b8e6]" />
                          NFT Benefits
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#e2b8e6] rounded-full mt-2 flex-shrink-0"></div>
                            <p>Store your personalized beauty routine on-chain</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#e2b8e6] rounded-full mt-2 flex-shrink-0"></div>
                            <p>Private metadata only you can access</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#e2b8e6] rounded-full mt-2 flex-shrink-0"></div>
                            <p>Proof of your Face-Fit journey</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#e2b8e6] rounded-full mt-2 flex-shrink-0"></div>
                            <p>Free to mint (gas fees only)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3992213/pexels-photo-3992213.jpeg" 
                    alt="Face-Fit Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-bold">face-fit</span>
              </div>
              <p className="text-gray-400 mb-2">
                &copy; 2025 Face-Fit. Built with Web3 technology on Base blockchain.
              </p>
              <p className="text-sm text-gray-500">
                Your beauty journey, secured by blockchain technology.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Web3Provider>
  );
}

export default App;