import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';

export const ConnectWalletButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-[#e2b8e6] px-6 py-3 rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-200"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition-all duration-200"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-[#e2b8e6] px-4 py-2 rounded-full font-bold transition-all duration-200"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};