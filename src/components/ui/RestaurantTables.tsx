import React from 'react';

interface Restaurant {
  name: string;
  priceRange: string;
  vegetarian?: boolean;
}

interface RestaurantTablesProps {
  title?: string;
  restaurants: Restaurant[];
}

export default function RestaurantTables({ title = 'RESTAURANTES', restaurants }: RestaurantTablesProps) {
  return (
    <section className="w-full max-w-6xl mx-auto">
      <h2 className="font-frente text-mainlight text-3xl md:text-4xl uppercase mb-6">{title}</h2>
      <div className="flex flex-col gap-4">
        {restaurants.map((rest, idx) => (
          <div
            key={idx}
            className="bg-maindark text-mainlight"
          >
            <div className="w-full mx-auto md:w-4/5 md:mx-0 grid grid-cols-2 md:flex md:flex-row md:items-center justify-between px-6 py-4 md:py-6 md:px-8 gap-2 md:gap-0 border-b-2 border-ultra/80 last:border-b-0">
              <div className="flex flex-col md:justify-center md:items-start">
                {rest.vegetarian && (
                  <span className="text-mainlight/80 text-xs md:text-sm font-economica mb-1 md:mb-0">Opciones vegetarianas</span>
                )}
                <span className="font-frente text-mainlight text-lg md:text-2xl uppercase tracking-wide">
                  {rest.name}
                </span>
              </div>
              <div className="flex flex-col items-start text-right">
                <span className="text-mainlight/80 text-xs md:text-sm font-economica text-left">Rango de precios:</span>
                <span className="font-frente text-mainlight text-lg md:text-2xl font-bold tracking-wider">
                  {rest.priceRange}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 