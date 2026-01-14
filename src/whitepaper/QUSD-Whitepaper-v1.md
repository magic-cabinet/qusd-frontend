# QUSD Protocol

**Programmable Settlement Infrastructure for the Agent Economy**

v1.0 — January 2026

---

## Executive Summary

QUSD is a fiat-backed stablecoin designed as programmable settlement infrastructure for autonomous systems. As AI agents, robotic systems, and IoT devices transition from passive tools to active economic participants, they require financial primitives purpose-built for machine-to-machine commerce.

The emerging agent economy introduces new requirements that existing stablecoin infrastructure cannot address. Agents need hierarchical wallet structures, programmable spending policies, cross-chain interoperability, and integration with agent communication protocols. QUSD provides these capabilities as a foundational settlement layer.

QUSD is fully backed 1:1 by fiat currency deposits at regulated banking partners. Every QUSD is redeemable for one US dollar. A separate governance token, QGOV, provides ownership in the liquidity and operations treasury without any claim on QUSD reserves.

**Core Properties:**
- 1:1 fiat backing with real-time reserve attestation
- Multi-chain native via QUBIT cross-chain transfer protocol
- Agent-first SDK for autonomous systems
- Interoperable with MCP, A2A, and AP2 protocol standards
- GENIUS Act responsive design

---

## 1. Introduction

### 1.1 The Agent Economy

The past two years have marked a phase transition in autonomous systems. Large language models execute multi-step tasks with increasing reliability. Robotic systems operate in warehouses, streets, and homes with growing autonomy. IoT devices make decisions and take actions without human oversight.

These systems share a common constraint: they cannot natively hold or spend value. When an AI agent needs to purchase compute, a robot needs to order supplies, or an autonomous vehicle needs to pay a toll, the current paradigm requires human approval at each step. This creates friction that prevents truly autonomous operation.

The agent economy requires financial infrastructure designed for machine participants—not human wallet interfaces retrofitted for programmatic access.

### 1.2 Protocol Landscape

A new stack of protocols is emerging to support agent interoperability:

**Model Context Protocol (MCP)** standardizes how agents connect to tools, APIs, and data sources. It provides the vertical integration between an agent and its capabilities.

**Agent2Agent Protocol (A2A)** enables horizontal communication between agents. It provides a shared language and secure channel for agent collaboration across organizational boundaries.

**Agent Payments Protocol (AP2)** introduces mandates—digitally signed statements that define what an agent is authorized to do. These mandates are portable, verifiable, and revocable, enabling secure agent commerce.

**Universal Commerce Protocol (UCP)** extends these capabilities across the full commerce journey, from discovery and purchasing to fulfillment and support.

**NANDA** provides the discovery and identity layer—a decentralized index enabling agents to find, verify, and trust one another at global scale.

What's missing is a **programmable settlement layer** designed for this stack. QUSD fills this gap.

### 1.3 Design Principles

QUSD is built on five principles:

1. **Agent-native**: APIs and SDKs designed for autonomous systems, not adapted from human interfaces
2. **Interoperable**: Compatible with emerging agent protocol standards
3. **Verifiable**: Real-time reserve attestation and on-chain transparency
4. **Multi-chain**: Unified experience across chains via QUBIT protocol
5. **Compliant**: GENIUS Act responsive architecture

---

## 2. QUSD Stablecoin

### 2.1 Backing and Reserves

Every QUSD token is backed 1:1 by US dollar deposits held at regulated banking partners. Reserve composition follows a tiered liquidity structure:

| Asset Class | Allocation | Purpose |
|-------------|------------|---------|
| Bank Deposits | 20-30% | Immediate redemption liquidity |
| Short-Term US Treasuries | 60-70% | Yield generation, high liquidity |
| Overnight Repo | 5-10% | Additional yield, same-day access |

Reserves are held across a minimum of two banking partners to provide redundancy. No single institution holds more than 50% of total reserves.

### 2.2 Minting and Redemption

QUSD minting is available to verified institutional participants.

**Minting Process:**
1. Complete KYC/KYB verification
2. Wire USD to designated reserve account (minimum $50,000)
3. QUSD minted to specified wallet address
4. Settlement: T+1 for standard wire, same-day for eligible transfers

**Redemption Process:**
1. Submit redemption request via institutional portal
2. QUSD burned from wallet
3. USD wired to verified bank account
4. Settlement: T+1 to T+5 depending on amount and destination

Redemption is always available. There are no gates, windows, or restrictions beyond standard compliance requirements.

### 2.3 Reserve Attestation

QUSD implements real-time reserve verification through Chainlink Proof of Reserve. This provides:

- Continuous on-chain attestation of backing assets
- Cryptographic verification before large operations
- Public transparency without reliance on periodic audits alone

Monthly third-party attestations supplement real-time verification.

### 2.4 Peg Stability

QUSD maintains its dollar peg through multiple mechanisms:

**Redemption Arbitrage**: If QUSD trades below $1.00, arbitrageurs purchase at discount and redeem at par.

**Minting Arbitrage**: If QUSD trades above $1.00, arbitrageurs mint at par and sell at premium.

**Peg Stability Module (PSM)**: Instant 1:1 swaps between QUSD and a basket of major stablecoins (USDC, USDT, DAI, FRAX, PYUSD, USDe). This provides an immediate arbitrage floor without waiting for fiat settlement.

**Protocol-Owned Liquidity**: Reserve interest allocation (60%) funds deep liquidity across Uniswap V4 pools on all supported chains.

---

## 3. QUBIT: Cross-Chain Transfer Protocol

### 3.1 Overview

QUBIT (QUSD Bridge & Interoperability Transfer) is QUSD's native cross-chain protocol. Rather than depend on third-party bridge infrastructure, QUBIT provides purpose-built interoperability for QUSD transfers.

### 3.2 Architecture

QUBIT implements a burn-and-mint model:

1. User initiates transfer on source chain
2. QUSD burned on source chain
3. Attestation generated and propagated
4. Equivalent QUSD minted on destination chain
5. Transfer confirmed to user

This ensures canonical QUSD tokens on all chains—no wrapped or bridged representations.

### 3.3 Supported Chains

QUSD launches natively on three chains:

| Chain | Rationale |
|-------|-----------|
| **Ethereum** | DeFi liquidity, institutional preference, canonical deployment |
| **Solana** | High throughput, robotics ecosystem, low-cost operations |
| **Monad** | Next-generation EVM, high performance, emerging ecosystem |

Additional chains are added through governance approval.

### 3.4 Unified Agent Experience

Agents interacting with QUSD receive a consistent interface regardless of underlying chain:

- **Unified Balance**: Single balance view aggregating holdings across all chains
- **Automatic Routing**: Transfers route through optimal path automatically
- **Chain Abstraction**: Agent SDK handles chain-specific details transparently

---

## 4. Agent Infrastructure

### 4.1 Hierarchical Wallets

QUSD implements a hierarchical wallet structure designed for agent deployments:

**Master Accounts** are controlled by verified entities and can:
- Create sub-agent wallets
- Set spending limits per wallet
- Define approved recipient lists
- Revoke wallet access

**Sub-Agent Wallets** operate within defined parameters:
- Inherit compliance status from master
- Enforce spending policies automatically
- Report activity to master account

This enables an organization to deploy thousands of agents, each with isolated balances and defined authorities, managed from a single master account.

### 4.2 Spending Policies

On-chain spending policies define what agents can do with QUSD:

- **Per-Transaction Limits**: Maximum amount per transfer
- **Daily/Weekly Caps**: Rolling spending limits
- **Recipient Allowlists**: Approved destination addresses
- **Category Restrictions**: Permitted merchant or contract types

Policies are cryptographically signed and enforced at the protocol level. Agents cannot exceed their mandates.

### 4.3 Protocol Integration

QUSD integrates with the emerging agent protocol stack:

**MCP Integration**: QUSD wallet access as an MCP server. Agents using Model Context Protocol can query balances, initiate transfers, and check transaction status through standardized tool interfaces.

**A2A Compatibility**: QUSD transfers as A2A protocol messages. Agent-to-agent payments flow through standard A2A communication channels.

**AP2 Settlement**: QUSD as a settlement currency for Agent Payments Protocol. When AP2 mandates authorize payment, QUSD provides the settlement rail.

### 4.4 QROS: Robotics Payment Infrastructure

**QROS** (QUSD Robot Operating System) is a fork of ROS Bridge designed for native QUSD payment capabilities:

- **ROS 2 Native**: Full integration with ROS 2 Humble and Jazzy
- **Payment Node**: Dedicated ROS node for transfer, balance, and policy services
- **Policy Engine**: On-robot spending limits, vendor whitelists, geographic bounds
- **Secure Signing**: Hardware security module support, keys never leave device

QROS enables robots to autonomously pay for charging, order supplies, access restricted zones, and purchase services from other robots.

See: `QROS-Robotics.md`

### 4.5 IoT and Industrial SDKs

Beyond robotics, QUSD provides SDKs for:

- **IoT Devices**: Lightweight SDK for constrained environments
- **Industrial Automation**: PLC and SCADA integration patterns
- **Edge Computing**: NVIDIA Jetson and similar platforms

---

## 5. Corporate Structure

### 5.1 Five-Entity Architecture

QUSD operates through five separate legal entities designed for regulatory clarity and user protection:

**Entity 1 — QUSD Issuer**
- Licensed stablecoin issuer
- Executes mint and burn operations
- Maintains smart contract authority
- Jurisdiction: Cayman Islands

**Entity 2 — Reserve Holdings**
- Holds fiat reserves at banking partners
- Legally segregated from operational funds
- Protected for QUSD holders in any insolvency
- Jurisdiction: Panama

**Entity 3 — Technology**
- Develops smart contracts and infrastructure
- Maintains QUBIT protocol
- Operates agent SDKs
- Jurisdiction: Delaware

**Entity 4 — Governance Foundation**
- Manages QGOV token
- Administers treasury operations
- Oversees liquidity deployment
- Jurisdiction: Cayman Islands

**Entity 5 — Operations**
- Customer onboarding and KYC
- Banking relationships
- Compliance monitoring
- Jurisdiction: Panama

### 5.2 Regulatory Positioning

QUSD is designed as GENIUS Act responsive while primarily serving non-US markets. This means:

- Reserve composition follows permitted asset guidelines
- Attestation and transparency meet or exceed requirements
- Corporate structure provides regulatory separation
- US persons access QUSD through secondary markets only

---

## 6. QGOV Governance Token

### 6.1 Purpose

QGOV is a governance token entirely separate from QUSD. It represents:

- Ownership stake in the liquidity and operations treasury
- Voting rights on protocol parameters
- Pro-rata share of protocol revenues

QGOV does NOT represent any claim on QUSD reserves. QUSD backing is held by Entity 2. QGOV treasury is managed by Entity 4. These are legally and operationally separate.

### 6.2 Token Economics

| Allocation | Amount | Percentage |
|------------|--------|------------|
| Public Sale | 300M QGOV | 30% |
| Treasury | 250M QGOV | 25% |
| Team | 200M QGOV | 20% |
| Ecosystem | 150M QGOV | 15% |
| Liquidity | 100M QGOV | 10% |
| **Total Supply** | **1,000,000,000 QGOV** | **100%** |

### 6.3 Token Sale

| Phase | Allocation | Price | Raise |
|-------|------------|-------|-------|
| Seed | 50M (5%) | $0.02 | $1.0M |
| Strategic | 100M (10%) | $0.04 | $4.0M |
| Public | 150M (15%) | $0.05 | $7.5M |
| **Total** | **300M (30%)** | — | **$12.5M** |

All purchasers receive identical rights. No preferential terms or side arrangements.

### 6.4 Revenue Distribution

Reserve interest and protocol fees flow as follows:

| Destination | Allocation | Purpose |
|-------------|------------|---------|
| Liquidity Operations | 60% | Uniswap V4 pools, QUBIT liquidity, PSM reserves |
| Operations | 25% | Entity 5 funding, compliance, banking |
| QGOV Stakers | 15% | veQGOV holder rewards |

QUSD holders receive no yield. This is by design for regulatory compliance.

### 6.5 Governance Scope

QGOV holders vote on:

- New chain deployments
- Fee parameter adjustments
- Treasury allocation priorities
- Protocol upgrades
- PSM basket composition

QGOV holders do not vote on:
- Compliance decisions (legal requirements override)
- Emergency security actions (speed required)
- Reserve management (Entity 2 responsibility)

---

## 7. Use of Proceeds

### 7.1 Allocation

Token sale proceeds fund the QGOV Treasury (Entity 4):

| Category | Allocation | Amount |
|----------|------------|--------|
| Liquidity Infrastructure | 65% | $8.125M |
| Strategic Currency Positions | 20% | $2.5M |
| Operations & Compliance | 15% | $1.875M |

### 7.2 Liquidity Infrastructure (65%)

**DEX Liquidity** — $4M
- QUSD/USDC and QUSD/USDT pairs on Ethereum, Solana, Monad
- Concentrated liquidity positions on Uniswap V4
- Custom hooks for peg stability and dynamic fees

**QUBIT Bridge Liquidity** — $2M
- Cross-chain transfer reserves
- Fast finality positions
- Emergency liquidity buffers

**Market Making** — $2.125M
- Professional market maker relationships
- 24/7 quote provision
- Volatility management

### 7.3 Strategic Currency Positions (20%)

**JPYC Corridor** — $1M
- Japanese Yen stablecoin holdings
- QUSD/JPYC trading pairs
- Asia-Pacific agent commerce

**EURC Corridor** — $1M
- Euro stablecoin holdings
- QUSD/EURC trading pairs
- European market access

**Expansion Reserve** — $500K
- Governance-approved new corridors
- Emerging market stablecoins
- Regional expansion

### 7.4 Operations & Compliance (15%)

| Item | Allocation |
|------|------------|
| Smart Contract Audits | $500K |
| Legal and Regulatory | $500K |
| Technology Development | $500K |
| Banking Partner Setup | $200K |
| Operational Runway | $175K |

---

## 8. Technical Architecture

### 8.1 Smart Contracts

**Core Token**
- ERC-20 on EVM chains (Ethereum, Monad)
- SPL Token on Solana
- Mint/burn restricted to authorized addresses
- Pausable for emergency response
- Upgradeable via timelock proxy

**Agent Wallet System**
- Hierarchical account creation
- On-chain spending policy enforcement
- Batch transaction support
- Cross-chain balance aggregation

**Peg Stability Module**
- Multi-asset swap routing
- Slippage protection
- Arbitrage incentive alignment

### 8.2 Security Model

**Audit Program**
- Pre-launch audits from two top-tier firms
- Continuous audit engagement
- Public bug bounty ($250K pool)

**Access Controls**
- Mint authority: 4-of-7 multisig
- Upgrade authority: 5-of-9 multisig + 7-day timelock
- Emergency pause: 2-of-5 multisig

**Key Management**
- Hardware security modules
- Geographic distribution
- Recovery procedures

### 8.3 Uniswap V4 Integration

QUSD deploys custom Uniswap V4 hooks:

**Truncated Oracle Hook**
- Manipulation-resistant price feeds
- Smoothed price impact over time
- Safe for DeFi integrations

**Dynamic Fee Hook**
- Volatility-adjusted swap fees
- LP protection during market stress
- Peg stability incentives

**Liquidity Management**
- Automated position rebalancing
- Concentrated liquidity optimization
- Cross-pool arbitrage

---

## 9. Risk Factors

### 9.1 Regulatory Risk

Stablecoin regulation continues to evolve. Changes to GENIUS Act interpretation, new international requirements, or enforcement actions could affect QUSD operations.

*Mitigation*: Multi-entity structure provides flexibility. Legal budget for ongoing compliance. Active regulatory monitoring.

### 9.2 Banking Risk

Banking partners may fail or terminate relationships. This has affected other stablecoin issuers (SVB/Circle, Prime Trust/TUSD).

*Mitigation*: Minimum two banking partners. Maximum 50% exposure per institution. Real-time reserve monitoring.

### 9.3 Smart Contract Risk

Smart contracts may contain vulnerabilities despite auditing.

*Mitigation*: Multiple audits. Bug bounty program. Timelocked upgrades. Insurance coverage.

### 9.4 Bridge Risk

Cross-chain infrastructure introduces additional attack surface.

*Mitigation*: QUBIT as purpose-built protocol. Conservative security parameters. Graduated limits.

### 9.5 Market Risk

Temporary de-pegging may occur during market stress despite full backing.

*Mitigation*: Multi-stablecoin PSM. Deep protocol-owned liquidity. Professional market making.

---

## 10. Roadmap

### Phase 1: Foundation
- Entity formation and legal structure
- Banking partner relationships
- Smart contract development
- Security audits

### Phase 2: Launch
- Ethereum mainnet deployment
- QGOV token sale
- Initial liquidity deployment
- Institutional onboarding

### Phase 3: Expansion
- Solana and Monad deployment
- QUBIT cross-chain activation
- Agent SDK v1.0
- AI framework integrations

### Phase 4: Scale
- JPYC and EURC corridors
- QROS v1.0 (ROS 2 payment bridge)
- Additional chain deployments
- Enterprise partnerships

---

## 11. Conclusion

The agent economy requires financial infrastructure designed for its participants. Existing stablecoins serve human users through human interfaces. QUSD provides programmable settlement infrastructure purpose-built for autonomous systems.

By integrating with emerging agent protocols, implementing hierarchical wallet structures, and providing cross-chain interoperability through QUBIT, QUSD enables the next generation of agent commerce.

QUSD is not a marginal improvement on existing stablecoins. It is foundational infrastructure for a new category of economic participant.

---

## Appendices

### Appendix A: Stablecoin Competitive Analysis
See: `stablecoin-analysis.md`

### Appendix B: Design Decision Log
See: `QUSD-Design-Process.md`

### Appendix C: Technical Specifications
[To be published with mainnet launch]

### Appendix D: Legal Disclaimers

This document is for informational purposes only and does not constitute an offer to sell or solicitation to buy any tokens or securities. QGOV tokens have not been registered under any securities laws.

Forward-looking statements regarding features, timelines, and market conditions are subject to risks and uncertainties. Actual results may differ materially.

Participation in cryptocurrency protocols involves substantial risk of loss. Consult qualified advisors before participating.

---

*QUSD Protocol — Programmable Settlement for the Agent Economy*
