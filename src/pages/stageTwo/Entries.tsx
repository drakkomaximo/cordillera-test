import React from 'react'
import PricingTables, { PricingStage } from './PricingTables'

const vipPricing: PricingStage[] = [
  {
    combo: 'VIP Sudamerican Rockers',
    stage: 'Etapa 1',
    priceCOP: 1259000,
    priceUSD: null,
    benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
    url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
  },
  {
    combo: 'VIP Sudamerican Rockers',
    stage: 'Etapa 2',
    priceCOP: 1379000,
    priceUSD: null,
    benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
    url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
  },
  {
    combo: 'VIP Sudamerican Rockers',
    stage: 'Etapa 3',
    priceCOP: 1499000,
    priceUSD: null,
    benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
    url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
  },
];
const gaPricing: PricingStage[] = [
  {
    combo: 'GA Sudamerican Rockers',
    stage: 'Etapa 1',
    priceCOP: 619000,
    priceUSD: null,
    benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
    url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
  },
  {
    combo: 'GA Sudamerican Rockers',
    stage: 'Etapa 2',
    priceCOP: 659000,
    priceUSD: null,
    benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
    url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
  },
  {
    combo: 'GA Sudamerican Rockers',
    stage: 'Etapa 3',
    priceCOP: 709000,
    priceUSD: null,
    benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
    url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
  },
];

const Entries = () => {
  return (
    <div className='flex flex-col items-left justify-left w-full px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto'>
      <h2 className='text-h2-mobile md:text-h2-desktop !text-[52px] md:!text-[64px] text-mainlight font-frente text-left mb-10 md:mb-14'>ENTRADAS</h2>

      <div className='flex flex-col gap-24'>
        <PricingTables stages={vipPricing} title='VIP Sudamerican Rockers' />
        <PricingTables stages={gaPricing} title='GA Sudamerican Rockers' />
      </div>
    </div>
  )
}

export default Entries