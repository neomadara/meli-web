'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import { formatPriceToCLP } from '@/app/lib/utils';
import './styles.css';
import React from "react";

function getRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export default function ItemPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  // @ts-ignore
  const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());
  const { data, error, isLoading } = useSWR(`https://meli-api.vercel.app/api/items/${id}`, fetcher);

  if (isLoading) return <div className="flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center">Cargando...</div>;

  if (error) return <div className="flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center">Error al cargar el producto. Intente nuevamente más tarde.</div>;

  const item = data?.item;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-32 bg-grey">
      {item && (
        <div className="item-container bg-white">
          <div className={'flex flex-row justify-between'}>
            <div className={'rounded-2xl'} style={{ width: 400, height: 400 }}>
              <Image src={item.picture} alt={item.title} width={400} height={400}/>
            </div>
            <div className={'text-black content-center'}>
              <p>{getRandomNumber()} - {item.condition ? 'Nuevo' : 'Usado'}</p>
              <p className={'font-bold text-sm'}>{item.title}</p>
              <p className={'font-bold'}>{formatPriceToCLP(item.price.amount)}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Comprar
              </button>
            </div>
          </div>
          <div className="text-black content-center p-3">
            <p className={'pb-3 font-bold'}>Descripcion del producto</p>
            <p className={'text-left'}>{item.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}
