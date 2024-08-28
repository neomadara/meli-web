'use client';

import './SearchBar.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/items?search=${searchValue}`);
  };

  return (
    <div className={'mercadoLibreBgColor searchBarContainer'}>
      <div className={'logo'}></div>
      <div className={'inputButtonContainer'}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Nunca dejes de buscar"
          maxLength={124}
          autoCorrect='off'/>
        <button className={'searchButton'} onClick={handleButtonClick}>
          <MagnifyingGlassIcon className="searchIcon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

// TODO
// testing
// breadcrumb
