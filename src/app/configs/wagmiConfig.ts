import { createConfig, http } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'

const projectId = '04a883a61353107690a81567a3998e0e'

export const wagmiConfig = createConfig({
    chains: [mainnet, base],
    connectors: [
        walletConnect({ projectId }),
        metaMask(),
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
    },
})