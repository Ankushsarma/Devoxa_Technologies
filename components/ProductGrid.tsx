import React from 'react';

// Example product data type
export interface Product {
  id: string | number;
  name: string;
  price: string;
  imageUrl?: string;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    // The wrapper ensures the grid doesn't cause horizontal scrolling on mobile
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8"
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#a78bfa] transition-colors duration-300"
          >
            {/* Product Image Placeholder */}
            <div className="aspect-square bg-white/10 w-full relative">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
              {product.description && (
                <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold text-[#a78bfa]">{product.price}</span>
                <button className="px-4 py-2 bg-white/10 hover:bg-[#a78bfa] hover:text-white text-sm font-medium text-gray-200 rounded-lg transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
