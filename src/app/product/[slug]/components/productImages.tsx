"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  name: string;
  imageUrls: string[];
}

const ProductImage = ({ imageUrls, name }: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl:string)=>{
    setCurrentImage(imageUrl)
  }
  return (
    <div className="flex flex-col">
      <div className=" bg-accent h-[380px] w-full flex items-center justify-center">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      <div className="grid grid-cols-4 mt-8 gap-4 px-5">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent ${
              imageUrl === currentImage &&
              "border-2 border-solid border-primary"
            }`}
            onClick={()=> handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
            
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
