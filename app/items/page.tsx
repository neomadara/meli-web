'use client';

import './styles.css';
import { useSearchParams } from 'next/navigation';
import useSWR from "swr"
import Image from "next/image";
import {fetcher, formatPriceToCLP} from "@/app/lib/utils";
import React from "react";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import { useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const router = useRouter();

  const { data, error, isLoading } = useSWR(`https://meli-api.vercel.app/api/items?q=${searchQuery}`, fetcher)

  if (isLoading) return <div className={'flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center'}>Cargando resultados...</div>

  if (error) return <div className={'flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center'}>Vuelva mas tarde...</div>

  if (data.items.length === 0) return <div className={'flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center'}>No se encontraron resultados</div>

  const handleItemClick = (id: string) => {
    router.push(`/items/${id}`);
  };

  const categories = data?.categories?.slice(0, 4) || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-32 bg-grey">
      <p className={'text-black text-left pb-3.5'}>
        {categories.map((category: any, index: number) => (
          <span key={index}>{category.name}{index < categories.length - 1 ? ' > ' : ''}</span>
        ))}
      </p>

      <div className="items-container">
        {data?.items?.map((item: any) => (
          <div key={item.id} className="item-container bg-white" onClick={() => handleItemClick(item.id)}>
            <div className={'rounded-2xl'}>
              <Image src={item.picture} alt={item.title} width={200} height={200}/>
            </div>
            <div className={'text-black content-center'}>
              <div className="price-icon-container">
                <div>{formatPriceToCLP(item.price.amount)}</div>
                {item.free_shipping && <CheckCircleIcon className="freeShippingIcon"/>}
              </div>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// TODO
// testing !!!!!
// TODO
