import { Composition } from 'remotion'
import { LogoReveal } from './compositions/LogoReveal'
import { HeroSequence } from './compositions/HeroSequence'
import { FeatureCards } from './compositions/FeatureCards'
import { FullSiteIntro } from './compositions/FullSiteIntro'
import { Coin3D, CoinShower, CoinStack } from './compositions/Coin3D'
import {
  ExtrudedLogoCoin,
  ExtrudedLogoCoinHero,
  CoinSlowSpin,
  CoinFlipReveal,
  CoinOrbit,
  CoinBounceDrop,
  CoinTripleStack,
} from './compositions/ExtrudedLogoCoin'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 2D Compositions */}
      <Composition
        id="LogoReveal"
        component={LogoReveal}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroSequence"
        component={HeroSequence}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FeatureCards"
        component={FeatureCards}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FullSiteIntro"
        component={FullSiteIntro}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3D Coin Compositions */}
      <Composition
        id="Coin3D"
        component={Coin3D}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinShower"
        component={CoinShower}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinStack"
        component={CoinStack}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Extruded Logo Coins */}
      <Composition
        id="ExtrudedLogoCoin"
        component={ExtrudedLogoCoin}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ExtrudedLogoCoinHero"
        component={ExtrudedLogoCoinHero}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinSlowSpin"
        component={CoinSlowSpin}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinFlipReveal"
        component={CoinFlipReveal}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinOrbit"
        component={CoinOrbit}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinBounceDrop"
        component={CoinBounceDrop}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CoinTripleStack"
        component={CoinTripleStack}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}
