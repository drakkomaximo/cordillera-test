import React from 'react'
import PricingTables, { PricingStage } from './PricingTables'

const pricingGeneral: PricingStage[] = [
  {
    combo: 'COMBO GENERAL',
    stage: 'ETAPA 1',
    priceCOP: 300000,
    priceUSD: null,
    benefits: null,
  },
]

const pricingVip: PricingStage[] = [
  {
    combo: 'COMBO VIP',
    stage: 'ETAPA 1',
    priceCOP: 300000,
    priceUSD: null,
    benefits: null,
  },
]

const Entries = () => {
  return (
    <div className='flex flex-col items-left justify-left w-full px-24'>
      <h2 className='text-h2-mobile md:text-h2-desktop text-mainlight font-frente text-left'>ENTRADAS</h2>

      <div className='flex flex-col gap-24 py-8'>
        <PricingTables stages={pricingGeneral} title='COMBO GENERAL'/>
        <PricingTables stages={pricingVip} title='COMBO VIP' small/>
      </div>
    </div>
  )
}

export default Entries