"use client";
import { useState } from "react";

export default function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`flex items-center justify-center w-full border rounded-md px-4 py-2 font-medium transition 
        ${
          isWishlisted
            ? "bg-pink-100 text-pink-600 border-pink-300 hover:bg-pink-200"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
    >
      {isWishlisted ? (
        <>
          <span className="mr-2">❤️</span> Added to Wishlist
        </>
      ) : (
        <>
          <span className="mr-2">🤍</span> Add to Wishlist
        </>
      )}
    </button>
  );
}
