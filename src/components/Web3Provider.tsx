import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from '../config/web3';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#3B82F6',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};