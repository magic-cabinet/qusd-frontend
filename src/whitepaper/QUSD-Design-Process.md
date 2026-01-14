# QUSD Design Process

Working through the stablecoin landscape to define QUSD's position on each critical design question.

---

## Decisions Made

| # | Category | Decision |
|---|----------|----------|
| 1 | Minting Access | Institutional only |
| 2 | Minimum Threshold | $50,000 |
| 3 | Banking Partners | 2 banks minimum |
| 4 | QUSD Yield | No yield to holders (GENIUS compliant) |
| 5 | Reserve Interest Split | 60% liquidity, 25% ops, 15% QGOV stakers |
| 6 | Licensing | Cayman/Panama, GENIUS-responsive, non-US clients |
| 7 | Cross-Chain Bridge | QUBIT (QUSD Bridge & Interoperability Transfer) — own protocol |
| 8 | Minting Process | Manual only (no automated oracle minting) |
| 9 | Collateralization | 1:1 fiat-backed |
| 10 | Peg Stability Module | Yes, multi-stablecoin |
| 11 | PSM Basket | USDC, USDT, DAI, FRAX, PYUSD, USDe (6 stables) |
| 12 | Positioning | Agent-first infrastructure |
| 13 | Launch Chains | Monad, Ethereum, Solana |
| 14 | Reserve Attestation | Real-time Chainlink Proof of Reserve |
| 15 | Agent Features | Hierarchical wallets + spending policies + robotics/IoT SDKs |
| 16 | AI Integrations | Anthropic, Gemini, expand from there |
| 17 | Protocol Stack | MCP, A2A, AP2/x402, UCP, NANDA — settlement layer positioning |

---

## How to Use This Document

Each section:
1. **What they do** — Brief summary of how the stablecoin works
2. **The issue** — The design question this raises for QUSD
3. **QUSD's answer** — Our position (to be filled in through discussion)

---

## 1. USDT (Tether) — $181.9B

### What they do
Tether is the largest stablecoin. Only institutions can mint directly — you wire money to Tether Limited, pass KYC, and they mint USDT to your wallet. Minimum redemption is $100,000. Everyone else buys USDT on exchanges.

### The issue
**Who can mint QUSD directly?**

Tether gates minting to big players. Retail users are second-class — they buy on secondary markets with spreads and can't redeem directly. This creates a two-tier system.

### QUSD's answer
- [ ] Institutional only (like Tether) — simpler ops, but excludes smaller users
- [ ] Retail access (like PayPal) — more inclusive, but higher compliance burden
- [ ] Hybrid — institutions mint, retail via partners
- [ ] Agent-focused — does retail even matter if we're building for machines?

**Decision**: _________________

**Rationale**: _________________

---

## 2. USDC (Circle) — $75.98B

### What they do
Circle operates Circle Mint for verified businesses. Full KYC required. They use multiple banking partners (some failed — Silvergate, Signature). For cross-chain, they built CCTP — burn on one chain, mint on another. Monthly attestations from Grant Thornton.

### The issue
**What happens when a banking partner fails?**

Circle lost access to $3.3B when SVB collapsed. USDC temporarily de-pegged to $0.87. They survived because they had multiple banks, but it exposed the risk.

### QUSD's answer
- [ ] Single banking partner — simpler but catastrophic if they fail
- [ ] Multiple partners — redundancy but operational complexity
- [ ] How many minimum? 2? 3? 5?
- [ ] What's the max exposure per bank? 25%? 33%? 50%?

**Decision**: _________________

**Rationale**: _________________

---

## 3. USDe (Ethena) — $11.87B

### What they do
USDe is "synthetic" — not backed by dollars in a bank. You deposit crypto (ETH, BTC), Ethena opens a short futures position to hedge, and mints USDe. The genius: funding rates from shorts generate yield. Stakers earn 15-25% APY through sUSDe.

### The issue
**Should QUSD offer yield?**

Ethena proved there's massive demand for yield-bearing stablecoins. But the GENIUS Act reportedly bans yield to retail. And yield comes from somewhere — either reserves or risk.

### QUSD's answer
- [ ] No yield on QUSD — pure stablecoin, no complications
- [ ] Yield to QGOV stakers — interest on reserves flows to governance token
- [ ] Tiered yield — institutions get yield, retail doesn't (GENIUS compliant?)
- [ ] Where does reserve interest go if not to holders?

**Decision**: _________________

**Rationale**: _________________

---

## 4. DAI (MakerDAO) — $5.4B

### What they do
DAI is permissionless. Anyone can deposit crypto collateral, mint DAI at 150%+ collateralization. No KYC. No company to call. Just smart contracts. MKR token holders vote on parameters.

### The issue
**Can QUSD be permissionless?**

DAI's model is beautiful for decentralization but incompatible with fiat backing. You can't have a regulated entity hold bank deposits for anonymous minters.

### QUSD's answer
- [ ] Minting requires KYC — no way around this for fiat-backed
- [ ] But what about secondary market? Once QUSD is on-chain, anyone can buy it on a DEX
- [ ] Do we try to restrict DEX trading? (Probably impossible/undesirable)
- [ ] How do we handle the "KYC for minting, permissionless for trading" reality?

**Decision**: _________________

**Rationale**: _________________

---

## 5. PYUSD (PayPal) — $2.73B

### What they do
PayPal made stablecoin minting as easy as Venmo. Open app, link bank, buy PYUSD. Zero fees. Paxos is the actual issuer — PayPal is just the distribution layer. 400M+ users can access instantly.

### The issue
**What's QUSD's user experience?**

If QUSD is "for agents," do we even care about human UX? Or does human UX drive initial adoption that agents then leverage?

### QUSD's answer
- [ ] Agent-first — APIs and SDKs, humans are secondary
- [ ] Human-first — build retail UX, agents come later
- [ ] Parallel — different interfaces for different users
- [ ] Partner model (like Paxos/PayPal) — we're infrastructure, partners build UX

**Decision**: _________________

**Rationale**: _________________

---

## 6. USD1 (World Liberty Financial) — $2.69B

### What they do
USD1 launched in March 2025, grew to $3B fast. Zero-fee minting/redemption. BitGo handles custody. They're applying for a national trust bank charter from OCC. Multi-chain via Chainlink CCIP.

### The issue
**What's QUSD's licensing pathway?**

USD1 is going federal (OCC charter). Most stablecoins use state money transmitter licenses. Federal is slower but gives nationwide coverage.

### QUSD's answer
- [ ] State MTLs first — faster launch, deal with 50-state compliance
- [ ] Federal charter — slower but cleaner long-term
- [ ] Hybrid — launch with state licenses, pursue federal in parallel
- [ ] Which states are must-haves for launch? NY? CA? TX?

**Decision**: _________________

**Rationale**: _________________

---

## 7. TUSD (TrueUSD) — $492M

### What they do
TUSD pioneered Chainlink Proof of Reserve for automated minting. The smart contract checks if reserves exist before allowing mint. Zero fees. But they got badly hurt when Prime Trust (their banking partner) went bankrupt. Justin Sun had to bail them out.

### The issue
**Should minting be automated via Proof of Reserve?**

Automated minting is trustless and fast. But if the oracle fails or is manipulated, unauthorized minting could occur.

### QUSD's answer
- [ ] Manual minting only — human reviews each mint, slower but safer
- [ ] Automated via PoR — faster, more trustless, oracle risk
- [ ] Hybrid — automated up to threshold, manual above
- [ ] What's the threshold? $100K? $1M? $10M?

**Decision**: _________________

**Rationale**: _________________

---

## 8. USDD (TRON DAO) — $465M

### What they do
USDD is overcollateralized — 200%+ backing in BTC, TRX, USDC. Whitelisted institutions burn TRX to mint USDD. For regular users, there's a Peg Stability Module (PSM) that allows 1:1 swaps between USDD and other stablecoins.

### The issue
**Should QUSD have a Peg Stability Module?**

A PSM allows instant arbitrage — if QUSD is at $0.99, anyone can swap USDC for QUSD and profit when it returns to $1. This maintains peg automatically.

### QUSD's answer
- [ ] Yes, PSM with USDC — requires holding USDC reserves
- [ ] Yes, PSM with multiple stables — more robust but more complexity
- [ ] No PSM — rely on mint/redeem arbitrage only
- [ ] If PSM, how much liquidity? $10M? $50M? $100M?

**Decision**: _________________

**Rationale**: _________________

---

## 9. FRAX — $350M

### What they do
FRAX started as "fractional-algorithmic" — partially backed by collateral, partially by algorithm. After UST collapsed, they went 100% collateralized. Now they're basically a USDC wrapper with extra DeFi features (frxETH, Fraxlend).

### The issue
**How does QUSD avoid algorithmic stigma?**

The word "algorithmic" is toxic after UST. Even though QUSD is fiat-backed, we need to be crystal clear about backing.

### QUSD's answer
- [ ] Language matters — never use "algorithm" in any context
- [ ] Lead with "fiat-backed" and "bank deposits" in all messaging
- [ ] Real-time proof of reserves to show backing constantly
- [ ] What's the messaging hierarchy? Fiat-backed > Regulated > Audited > ?

**Decision**: _________________

**Rationale**: _________________

---

## 10. GUSD (Gemini) — $47.8M

### What they do
GUSD was the first NYDFS-regulated stablecoin (2018). Fully compliant, audited, transparent. And it has $47M market cap vs USDT's $181B. Regulation alone doesn't drive adoption.

### The issue
**What actually drives stablecoin adoption?**

GUSD proves that being regulated and trustworthy isn't enough. USDT is sketchy but dominant. What else matters?

### QUSD's answer
- [ ] Distribution — need to be on every exchange, every DEX
- [ ] Use cases — need unique utility, not just "another stablecoin"
- [ ] Liquidity — need deep pools so large trades don't slip
- [ ] Integrations — need to be in DeFi protocols, agent frameworks
- [ ] What's QUSD's unique wedge that others don't have?

**Decision**: _________________

**Rationale**: _________________

---

## Summary: The Critical Decisions

### Minting & Access
1. Who mints? (Institutional / Retail / Agents / Partners)
2. What's the minimum? ($100 / $1K / $10K / $100K)
3. What are the fees? (Zero / 0.1% / 0.25%)

### Banking & Reserves
4. How many banking partners? (2 / 3 / 5+)
5. Max exposure per bank? (25% / 33% / 50%)
6. Reserve composition? (Cash only / Cash + T-bills / Cash + T-bills + MMF)

### Yield & Revenue
7. Does QUSD yield? (No / To QGOV only / Tiered)
8. Where does reserve interest go? (Treasury / QGOV stakers / Buyback)

### Licensing & Compliance
9. State or federal path? (State first / Federal / Hybrid)
10. Which states for launch? (NY, CA, TX minimum?)

### Technical
11. Automated minting via PoR? (No / Yes / Hybrid with threshold)
12. PSM for peg stability? (No / Yes with USDC / Yes with multiple)
13. Cross-chain method? (CCTP / LayerZero / Wormhole / Multiple)

### Positioning
14. Primary user? (Agents / Institutions / Retail / All)
15. Key differentiator? (Agent-first / Open source / Multi-chain / Compliance)
16. Messaging lead? (Fiat-backed / Regulated / For machines / ?)

---

## Next Steps

Work through each decision. For each one:
1. What's the answer?
2. Why?
3. What's the trade-off we're accepting?
4. What changes if we're wrong?

Then the whitepaper writes itself from the decisions.
