// ItemList.tsx
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import { formatPriceToCLP } from '@/app/lib/utils';

interface ItemListProps {
  items: any[];
  onItemClick: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemClick }) => (
  <div className="items-container">
    {items.map((item) => (
      <div key={item.id} className="item-container bg-white" onClick={() => onItemClick(item.id)}>
        <div className={'rounded-2xl'}>
          <Image src={item.picture} alt={item.title} width={200} height={200} />
        </div>
        <div className={'text-black content-center'}>
          <div className="price-icon-container">
            <div>{formatPriceToCLP(item.price.amount)}</div>
            {item.free_shipping && <CheckCircleIcon className="freeShippingIcon" />}
          </div>
          <p>{item.title}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ItemList;
