import React from 'react'
import PricingTables, { PricingStage } from './PricingTables'

const vipEtapa1: PricingStage = {
  combo: 'VIP Sudamerican Rockers',
  stage: 'Etapa 1',
  priceCOP: 1259000,
  priceUSD: null,
  benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
  url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
};
const vipEtapa2: PricingStage = {
  combo: 'VIP Sudamerican Rockers',
  stage: 'Etapa 2',
  priceCOP: 1379000,
  priceUSD: null,
  benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
  url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
};
const vipEtapa3: PricingStage = {
  combo: 'VIP Sudamerican Rockers',
  stage: 'Etapa 3',
  priceCOP: 1499000,
  priceUSD: null,
  benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
  url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
};
const gaEtapa1: PricingStage = {
  combo: 'GA Sudamerican Rockers',
  stage: 'Etapa 1',
  priceCOP: 619000,
  priceUSD: null,
  benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
  url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
};
const gaEtapa2: PricingStage = {
  combo: 'GA Sudamerican Rockers',
  stage: 'Etapa 2',
  priceCOP: 659000,
  priceUSD: null,
  benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
  url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
};
const gaEtapa3: PricingStage = {
  combo: 'GA Sudamerican Rockers',
  stage: 'Etapa 3',
  priceCOP: 709000,
  priceUSD: null,
  benefits: ['Preventa exclusiva para clientes de los bancos aval desde el 12 de mayo', 'Venta con todos los medios de pago desde el 14 de mayo'],
  url: 'https://www.ticketmaster.co/event/festival-cordillera-2025',
};

const Entries = () => {
  return (
    <div className='flex flex-col items-left justify-left w-full px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto'>
      <h2 className='text-h2-mobile md:text-h2-desktop text-mainlight font-frente text-left'>ENTRADAS</h2>

      <div className='flex flex-col gap-24 py-8'>
        <PricingTables stages={[vipEtapa1]} title='VIP Sudamerican Rockers - Etapa 1'/>
        <PricingTables stages={[vipEtapa2]} title='VIP Sudamerican Rockers - Etapa 2'/>
        <PricingTables stages={[vipEtapa3]} title='VIP Sudamerican Rockers - Etapa 3'/>
        <PricingTables stages={[gaEtapa1]} title='GA Sudamerican Rockers - Etapa 1'/>
        <PricingTables stages={[gaEtapa2]} title='GA Sudamerican Rockers - Etapa 2'/>
        <PricingTables stages={[gaEtapa3]} title='GA Sudamerican Rockers - Etapa 3'/>
      </div>
    </div>
  )
}

export default Entries