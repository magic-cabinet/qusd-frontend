# Stablecoin Competitive Analysis & QUSD Design Questions

This document analyzes how the top 10 stablecoins onboard liquidity and identifies the key design questions QUSD must answer.

---

## 1. USDT (Tether) — $181.9B

### How It Works
- **Issuer**: Tether Limited (British Virgin Islands)
- **Backing**: Claims 1:1 USD backing via cash, T-bills, commercial paper
- **Minting**: Only available to institutional clients through Tether directly
- **Process**: Wire USD to Tether → KYC/KYB verification → USDT minted to wallet
- **Redemption**: Minimum $100,000 for direct redemption
- **Retail Access**: Must buy on secondary market (exchanges, DEXs)

### Issues for QUSD to Address

- [ ] **Issue #1: Institutional vs Retail Access**
  - Tether gates minting to institutions. Retail buys on secondary market.
  - **Question**: Will QUSD allow direct retail minting, or follow the institutional-only model?
  - **Trade-off**: Direct retail = more accessible but higher compliance burden. Institutional-only = simpler ops but creates liquidity dependency on partners.

- [ ] **Issue #2: Minimum Redemption Thresholds**
  - Tether requires $100K minimum for direct redemption.
  - **Question**: What are QUSD's minimum mint/redeem thresholds?
  - **Consideration**: Zero minimums = operational overhead. High minimums = excludes smaller users.

- [ ] **Issue #3: Jurisdiction & Corporate Structure**
  - Tether operates from BVI with limited regulatory oversight.
  - **Question**: Where will QUSD entities be incorporated? How does the 5-entity structure map to jurisdictions?
  - **GENIUS Act**: Requires US-based issuer or foreign issuer meeting equivalent standards.

---

## 2. USDC (Circle) — $75.98B

### How It Works
- **Issuer**: Circle Internet Financial (US-based)
- **Backing**: Cash + short-dated US Treasuries, held at regulated banks
- **Minting**: Via Circle Mint platform for verified businesses
- **Process**: Bank transfer to Circle → KYC/KYB → USDC minted
- **Retail Access**: Through partners (Coinbase) or secondary markets
- **Multi-chain**: Native on 15+ chains via CCTP (Cross-Chain Transfer Protocol)

### Issues for QUSD to Address

- [ ] **Issue #4: Banking Partner Selection**
  - Circle uses multiple banking partners (including Signature, Silvergate — both failed).
  - **Question**: Which banking partners will hold QUSD reserves? How to handle bank failure risk?
  - **Consideration**: Need multiple banking relationships. Insurance/sweep arrangements.

- [ ] **Issue #5: Cross-Chain Transfer Protocol**
  - Circle built proprietary CCTP for native cross-chain transfers (burn on source, mint on destination).
  - **Question**: Will QUSD use CCTP, LayerZero, Wormhole, or build proprietary bridge?
  - **Trade-off**: CCTP = Circle dependency. LayerZero/Wormhole = third-party risk. Proprietary = development cost.

- [ ] **Issue #6: Attestation & Audit Frequency**
  - Circle publishes monthly attestations from Grant Thornton.
  - **Question**: What is QUSD's attestation schedule? Monthly? Real-time via Chainlink PoR?
  - **GENIUS Act**: Requires regular reserve attestations.

---

## 3. USDe (Ethena) — $11.87B

### How It Works
- **Issuer**: Ethena Labs
- **Backing**: "Synthetic dollar" — crypto collateral (ETH, BTC, stETH) + short perpetual futures positions
- **Minting**: Whitelisted users deposit USDC/USDT → Ethena opens delta-neutral hedge → USDe minted
- **Retail Access**: Buy on DEXs (Curve, Uniswap) without KYC
- **Yield**: Stake USDe → sUSDe earns funding rate yield (currently ~15-25% APY)

### Issues for QUSD to Address

- [ ] **Issue #7: Yield-Bearing vs Non-Yield**
  - USDe offers high yield through sUSDe staking.
  - **Question**: Will QUSD offer yield to holders? If so, through what mechanism?
  - **GENIUS Act**: The Act reportedly bans yield payments to retail. How does this affect QUSD design?
  - **QGOV Consideration**: Yield could flow to QGOV stakers instead of QUSD holders.

- [ ] **Issue #8: Permissionless Secondary Market**
  - USDe gates minting but allows permissionless DEX trading.
  - **Question**: How will QUSD balance KYC requirements with DeFi composability?
  - **Consideration**: Once QUSD is on-chain, anyone can trade it on DEXs regardless of KYC.

- [ ] **Issue #9: Synthetic vs Fiat-Backed**
  - USDe's synthetic model avoids banking but introduces derivatives risk.
  - **Question**: QUSD is fiat-backed — how to communicate the trust trade-off vs synthetic alternatives?

---

## 4. DAI (MakerDAO/Sky) — $5.4B

### How It Works
- **Issuer**: MakerDAO (decentralized, no legal entity traditionally)
- **Backing**: Overcollateralized crypto (ETH, WBTC, stablecoins) + RWA (real-world assets)
- **Minting**: Fully permissionless — anyone can open a Vault, deposit collateral, mint DAI
- **Process**: Deposit $150+ of ETH → Mint $100 DAI (150% collateralization ratio)
- **Retail Access**: Direct minting or buy on any DEX
- **Governance**: MKR token holders vote on parameters

### Issues for QUSD to Address

- [ ] **Issue #10: Permissionless Minting Model**
  - DAI allows anyone to mint without KYC.
  - **Question**: Is a permissionless model compatible with GENIUS Act compliance?
  - **Answer**: Likely no for fiat-backed stablecoin. QUSD must gate minting.

- [ ] **Issue #11: Collateralization Ratio**
  - DAI requires overcollateralization (150%+).
  - **Question**: QUSD is 1:1 fiat-backed — no overcollateralization needed. How to communicate this simplicity as advantage?

- [ ] **Issue #12: Governance Token Role**
  - MKR governs protocol parameters, collateral types, risk parameters.
  - **Question**: What exactly does QGOV govern? Specific scope needed.
  - **Options**: Chain deployments, fee parameters, treasury allocation, reserve asset composition.

---

## 5. PYUSD (PayPal) — $2.73B

### How It Works
- **Issuer**: Paxos Trust Company (regulated by NYDFS)
- **Backing**: US dollars, T-bills, cash equivalents
- **Minting**: Through PayPal app (retail) or Paxos (institutional)
- **Process**: Link bank account → Buy PYUSD in PayPal app → Can send to external wallet
- **Retail Access**: Directly through PayPal — 400M+ user base
- **Fees**: Zero fees for mint/redeem within PayPal

### Issues for QUSD to Address

- [ ] **Issue #13: Retail Onboarding UX**
  - PayPal made stablecoin minting as easy as Venmo.
  - **Question**: What is QUSD's retail onboarding flow? App? Web portal? Partner integrations only?
  - **Agent Focus**: If QUSD is "for agents," is retail UX even a priority?

- [ ] **Issue #14: Paxos as Issuer Model**
  - PayPal doesn't issue PYUSD — Paxos does. PayPal is distribution partner.
  - **Question**: Could QUSD use a similar model? Licensed issuer (Entity 1) + distribution partners?
  - **Consideration**: Separates regulatory burden from product development.

- [ ] **Issue #15: Zero-Fee Economics**
  - PYUSD charges no mint/redeem fees.
  - **Question**: What is QUSD's fee structure? If zero fees, how does the issuer entity sustain operations?
  - **Answer**: Interest on reserves. But GENIUS Act may limit this.

---

## 6. USD1 (World Liberty Financial) — $2.69B

### How It Works
- **Issuer**: WLTC Holdings (applying for national trust bank charter)
- **Backing**: USD deposits, short-term Treasuries at BitGo Trust
- **Minting**: Deposit USD to BitGo-managed account → USD1 minted
- **Process**: KYC required, institutional focus initially
- **Multi-chain**: 10+ chains via Chainlink CCIP
- **Fees**: Zero-fee minting and redemption

### Issues for QUSD to Address

- [ ] **Issue #16: National Trust Bank Charter**
  - USD1 is pursuing OCC national trust bank charter for its issuer.
  - **Question**: What licensing pathway for QUSD's issuer entity? State money transmitter vs federal charter?
  - **Trade-offs**:
    - State MTL: Faster, need licenses in each state
    - Federal charter: Slower, nationwide coverage
    - Trust charter: Can custody but limited banking activities

- [ ] **Issue #17: Chainlink CCIP Dependency**
  - USD1 uses Chainlink for cross-chain and Proof of Reserve.
  - **Question**: How much Chainlink dependency is acceptable for QUSD?
  - **Consideration**: Single oracle provider = centralization risk. Multiple oracles = complexity.

- [ ] **Issue #18: BitGo Custody Model**
  - USD1 uses BitGo for both custody and reserve attestation.
  - **Question**: Who custodies QUSD's on-chain assets? Who provides reserve attestation?
  - **Entity 2**: Reserve Holder — is this BitGo-like qualified custodian?

---

## 7. TUSD (TrueUSD) — $492M

### How It Works
- **Issuer**: TrustToken (now Techteryx)
- **Backing**: USD at partner banks (Prime Trust — failed, now others)
- **Minting**: Deposit USD to designated bank account → Automated minting via Chainlink PoR
- **Process**: KYC on TrueUSD platform → Bank transfer → TUSD minted within 1 business day
- **Fees**: Zero fees for mint/redeem
- **Innovation**: First stablecoin with automated Proof of Reserve minting

### Issues for QUSD to Address

- [ ] **Issue #19: Automated Minting via PoR**
  - TUSD pioneered "if reserves exist, minting is allowed" automation.
  - **Question**: Should QUSD implement automated minting tied to reserve attestation?
  - **Benefit**: Reduces manual intervention, increases trust.
  - **Risk**: Oracle failure could enable unauthorized minting.

- [ ] **Issue #20: Banking Partner Failure**
  - TUSD was severely impacted by Prime Trust's bankruptcy.
  - **Question**: How does QUSD's Entity 2 (Reserve Holder) handle bank/custodian failure?
  - **Consideration**: Multiple banking partners, insurance, real-time reserve monitoring.

- [ ] **Issue #21: Ownership Changes**
  - TUSD was sold to Justin Sun-affiliated entities, raising governance questions.
  - **Question**: How is ownership/control of QUSD entities structured? Acquisition protections?

---

## 8. USDD (TRON DAO Reserve) — $465M

### How It Works
- **Issuer**: TRON DAO Reserve (consortium)
- **Backing**: Overcollateralized with BTC, TRX, USDT, USDC (200%+ ratio)
- **Minting**: Whitelisted institutions burn TRX to mint USDD
- **Retail Access**: Peg Stability Module (PSM) for 1:1 swaps with other stablecoins
- **Governance**: Controlled by TRON DAO Reserve members

### Issues for QUSD to Address

- [ ] **Issue #22: Peg Stability Module Design**
  - USDD's PSM allows anyone to swap USDC/USDT for USDD at 1:1.
  - **Question**: Should QUSD have a PSM for arbitrage stability?
  - **Benefit**: Maintains peg automatically through arbitrage.
  - **Consideration**: Requires liquidity reserves in other stablecoins.

- [ ] **Issue #23: Overcollateralization Communication**
  - USDD advertises 200%+ collateralization as safety feature.
  - **Question**: QUSD is 1:1 — how to position against overcollateralized competitors?
  - **Message**: "Your dollar is a dollar, not subject to collateral liquidation risk."

- [ ] **Issue #24: DAO Reserve Structure**
  - USDD is backed by a consortium/DAO holding reserves.
  - **Question**: Is QGOV's treasury similar to a DAO reserve? How to differentiate?
  - **Critical**: QGOV treasury ≠ QUSD reserves. This separation must be crystal clear.

---

## 9. FRAX — $350M

### How It Works
- **Issuer**: Frax Finance (decentralized)
- **Backing**: Originally fractional-algorithmic (partial collateral + FXS token). Now 100% collateralized.
- **Minting**: Deposit USDC → Mint FRAX (now 1:1)
- **History**: After UST collapse, moved from algorithmic to fully-backed
- **Products**: FRAX, sFRAX (staked), frxETH (ETH liquid staking)

### Issues for QUSD to Address

- [ ] **Issue #25: Algorithmic Stigma**
  - FRAX's algorithmic history (and UST's collapse) created market skepticism.
  - **Question**: How does QUSD clearly communicate "not algorithmic"?
  - **Message**: Emphasize fiat-backed, regulated, audited from day one.

- [ ] **Issue #26: Product Expansion**
  - FRAX expanded into LSD (frxETH), lending (Fraxlend), AMO strategies.
  - **Question**: What's QUSD's product roadmap beyond base stablecoin?
  - **Options**: JPYC corridor, EURC corridor, agent-specific APIs, lending protocol integration.

- [ ] **Issue #27: Collateral Type Communication**
  - FRAX is "USDC-backed" — essentially a wrapper with added features.
  - **Question**: What assets back QUSD? Cash only? T-bills? Money market funds?
  - **GENIUS Act**: Defines permitted reserve assets.

---

## 10. GUSD (Gemini) — $47.8M

### How It Works
- **Issuer**: Gemini Trust Company (NYDFS-regulated)
- **Backing**: USD held at State Street Bank
- **Minting**: Deposit USD on Gemini → Convert to GUSD 1:1
- **Process**: Must be Gemini customer with KYC
- **Retail Access**: Only through Gemini platform (closed ecosystem)
- **Regulation**: First regulated stablecoin (2018), NYDFS-approved

### Issues for QUSD to Address

- [ ] **Issue #28: Closed vs Open Ecosystem**
  - GUSD is tightly coupled to Gemini exchange.
  - **Question**: Will QUSD be tied to a specific platform or truly platform-agnostic?
  - **Agent Use Case**: Agents need platform-agnostic stablecoin.

- [ ] **Issue #29: Regulatory Pioneer Status**
  - GUSD was first NYDFS-approved stablecoin.
  - **Question**: What regulatory approvals should QUSD prioritize?
  - **Options**: NYDFS (NY), state MTLs, OCC charter, GENIUS Act compliance.

- [ ] **Issue #30: Market Share Despite Regulation**
  - GUSD has strong regulation but tiny market share ($47M vs USDT's $181B).
  - **Question**: Is regulation sufficient for adoption? What else drives stablecoin growth?
  - **Insight**: Distribution, DeFi integration, and use cases matter more than regulation alone.

---

## Summary: Key Design Questions for QUSD Whitepaper

### Minting & Redemption
1. Who can mint QUSD directly? (Institutional only vs retail access)
2. What are minimum/maximum thresholds?
3. What's the onboarding flow? (KYC process, timing, UX)
4. Fee structure? (Zero-fee competitive pressure)
5. Redemption timing? (T+1? Same-day? Depends on amount?)

### Reserve & Backing
6. What assets back QUSD? (Cash, T-bills, money market funds)
7. Which banks hold reserves? (Multiple partners, failure handling)
8. Attestation frequency? (Monthly, weekly, real-time PoR)
9. Who provides attestation? (Big 4 audit firm, Chainlink, both)

### Cross-Chain
10. Which chains at launch? (Ethereum, Arbitrum, Base, Solana, Polygon)
11. Bridge technology? (CCTP, LayerZero, Wormhole, proprietary)
12. Canonical vs bridged token handling per chain?

### Regulatory
13. Issuer licensing pathway? (State MTL, trust charter, federal)
14. Jurisdiction for each entity?
15. GENIUS Act compliance specifics?

### QGOV Separation
16. How is QGOV treasury clearly separated from QUSD reserves?
17. What does QGOV govern specifically?
18. Yield flow: where does reserve interest go?

### Agent-Specific
19. What makes QUSD specifically useful for agents vs existing stablecoins?
20. API/SDK design for autonomous systems?
21. Programmable spending limits, allowances, permissions?

---

## Next Steps

1. **Prioritize Issues**: Which of these 30 issues must be resolved for MVP whitepaper?
2. **Research Deep Dives**: Some issues need more research (GENIUS Act specifics, banking partners, licensing pathways)
3. **Decision Document**: Create decision log for each resolved issue
4. **Whitepaper Sections**: Map issues to whitepaper sections from the prompt
