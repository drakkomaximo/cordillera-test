import Image from "next/image";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import Columns from "@/components/ui/Columns";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RestaurantTables from '@/components/ui/RestaurantTables';
import PricingTables from '@/components/ui/PricingTables';

export default function Home() {
  const accordionItems = [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum interdum lacinia.',
      content: 'Curabitur vestibulum interdum lacinia. Donec aliquam leo in augue hendrerit viverra. Mauris vitae blandit augue. Cras vel turpis arcu. Nulla cursus fermentum eleifend. Ut a ipsum est. Morbi nec blandit nisi, at tristique nisi. Mauris maximus nulla vitae ante luctus interdum in eu magna. Sed quis auctor odio. Mauris at tincidunt sem, nec rhoncus ipsum. Integer rutrum egestas ipsum id sodales.'
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum interdum lacinia.',
      content: 'Contenido expandido del segundo ítem.'
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum interdum lacinia.',
      content: 'Contenido expandido del tercer ítem.'
    },
  ];

  const steps = [
    {
      image: "/columns-step-1.svg",
      title: "PASO 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla."
    },
    {
      image: "/columns-step-2.svg",
      title: "PASO 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla."
    },
    {
      image: "/columns-step-3.svg",
      title: "PASO 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla."
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-ultra">
      <Header />
      <div className="flex flex-col gap-4">
        <Button variant="primary">Call to Action</Button>
        <Button variant="primary" disabled>Call to Action</Button>
        <Button variant="secondary">Call to Action</Button>
        <Button variant="secondary" disabled>Call to Action</Button>
      </div>
      <div className="w-full max-w-3xl mt-12">
        <h2 className="text-3xl font-frente text-accentcyan mb-4">5.6) ACCORDION</h2>
        <Accordion items={accordionItems} />
      </div>
      <div className="w-full max-w-6xl mt-16">
        <Columns steps={steps} />
      </div>
      {/* H1 */}
      <h1 className="font-frente uppercase text-h1-mobile md:text-h1-desktop">
        Main Headings / H1
      </h1>
      {/* H2 */}
      <h2 className="font-frente uppercase text-h2-mobile md:text-h2-desktop">
        Headings / H2
      </h2>
      {/* H3 */}
      <h3 className="font-frente uppercase text-h3-mobile md:text-h3-desktop">
        Headings / H3
      </h3>
      {/* Paragraph */}
      <p className="font-economica text-p-mobile md:text-p-desktop max-w-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula volutpat lorem faucibus dictum. Mauris euismod, massa ac malesuada dictum, nulla arcu cursus risus, nec cursus velit nulla eu risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vel velit vitae lacus lacinia egestas. Integer sagittis, velit eget sodales posuere, velit erat facilisis velit, nec laoreet ipsum sapien sed odio.
      </p>
      {/* Restaurant Tables */}
      <div className="w-full max-w-6xl mt-8">
        <h2 className="text-3xl font-frente text-accentcyan mb-4">5.4) RESTAURANT TABLES</h2>
        <span className="font-economica text-mainlight text-xl mb-2 block">Ticket group</span>
        <RestaurantTables
          restaurants={[
            { name: 'CREPES AND WAFFLES', priceRange: '35.000 - 150.000 COP' },
            { name: 'CREPES AND WAFFLES', priceRange: '35.000 - 150.000 COP', vegetarian: true },
            { name: 'CREPES AND WAFFLES', priceRange: '35.000 - 150.000 COP', vegetarian: true },
          ]}
        />
      </div>
      {/* Pricing Tables */}
      <div className="w-full max-w-6xl mt-8">
        <h2 className="text-3xl font-frente text-accentcyan mb-4">5.3) PRICING TABLES</h2>
        <span className="font-economica text-mainlight text-xl mb-2 block">Ticket group</span>
        <PricingTables
          stages={[
            {
              combo: 'COMBO GENERAL',
              stage: 'ETAPA 1',
              priceCOP: '300.000 COP',
              priceUSD: '100 USD',
              benefits: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum interdum lacinia. Donec aliquam leo in augue hendrerit viverra. Mauris vitae blandit augue. Cras vel turpis arcu. Nulla cursus fermentum eleifend. Ut a ipsum est. Morbi nec blandit nisi, at tristique nisi. Mauris maximus nulla vitae ante luctus interdum in eu magna. Sed quis auctor odio. Mauris at tincidunt sem, nec rhoncus ipsum. Integer rutrum egestas ipsum id sodales.'
            },
            {
              combo: 'COMBO GENERAL',
              stage: 'ETAPA 2',
              priceCOP: '300.000 COP',
              priceUSD: '100 USD',
              benefits: 'Beneficios de la etapa 2: acceso a todas las zonas, merchandising exclusivo, y más.'
            },
            {
              combo: 'COMBO GENERAL',
              stage: 'ETAPA 3',
              priceCOP: '300.000 COP',
              priceUSD: '100 USD',
              benefits: 'Beneficios de la etapa 3: acceso a todas las zonas, experiencias VIP, y más.'
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  );
}
