'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import ItemDetails from './components/ItemDetails';
import { fetcher } from '@/app/lib/utils';
import React from 'react';
import './styles.css';

export default function ItemPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { data, error, isLoading } = useSWR(`https://meli-api.vercel.app/api/items/${id}`, fetcher);

  if (isLoading) return <div className="flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center">Cargando...</div>;

  if (error) return <div className="flex min-h-screen flex-col items-center justify-start p-16 bg-grey text-black content-center">Error al cargar el producto. Intente nuevamente más tarde.</div>;

  const item = data?.item;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-32 bg-grey">
      {item && <ItemDetails item={item} />}
    </main>
  );
}
