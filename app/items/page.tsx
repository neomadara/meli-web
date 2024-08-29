// Page.tsx
'use client';

import './styles.css';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import React from 'react';
import { useRouter } from 'next/navigation';
import Loading from './components/Loading';
import Error from './components/Error';
import NoResults from './components/NoResults';
import Breadcrumb from './components/Breadcrumb';
import ItemList from './components/ItemList';
import { fetcher } from '@/app/lib/utils';

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const router = useRouter();

  const { data, error, isLoading } = useSWR(`https://meli-api.vercel.app/api/items?q=${searchQuery}`, fetcher);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (data.items.length === 0) return <NoResults />;

  const handleItemClick = (id: string) => {
    router.push(`/items/${id}`);
  };

  const categories = data?.categories?.slice(0, 4) || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-32 bg-grey">
      <Breadcrumb categories={categories} />
      <ItemList items={data.items} onItemClick={handleItemClick} />
    </main>
  );
}
