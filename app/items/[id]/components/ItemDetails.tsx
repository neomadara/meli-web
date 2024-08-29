import Image from 'next/image';
import { formatPriceToCLP } from '@/app/lib/utils';
import React from 'react';

interface ItemDetailsProps {
  item: {
    id: string;
    picture: string;
    title: string;
    price: { amount: number };
    condition: boolean;
    description: string;
  };
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  const getRandomNumber = (): number => Math.floor(Math.random() * 100) + 1;

  return (
    <div className="item-container bg-white">
      <div className="flex flex-row justify-between">
        <div className="rounded-2xl" style={{ width: 400, height: 400 }}>
          <Image src={item.picture} alt={item.title} width={400} height={400} />
        </div>
        <div className="text-black content-center">
          <p>{getRandomNumber()} - {item.condition ? 'Nuevo' : 'Usado'}</p>
          <p className="font-bold text-sm">{item.title}</p>
          <p className="font-bold">{formatPriceToCLP(item.price.amount)}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Comprar
          </button>
        </div>
      </div>
      <div className="text-black content-center p-3">
        <p className="pb-3 font-bold">Descripcion del producto</p>
        <p className="text-left">{item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
