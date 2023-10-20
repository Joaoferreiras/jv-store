import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/productList";
import SectionTitle from "./components/sectionTitle";
import PromoBanner from "./components/promoBanner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where:{
      category:{
        slug:"mouses"
      }

    }
  })
  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="/BannerHome01.png"
        alt="Até 55% de desconto esse mês!"
      />

      <div className=" px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/BannerHome02.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div>
        <PromoBanner
          src="/BannerHome03.png"
          alt="Até 20% de desconto em fones!"
        />
      </div>
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}