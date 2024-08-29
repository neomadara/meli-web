import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/items/page';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the useSWR hook
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Page', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSWR = useSWR as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state', () => {
    mockUseSWR.mockReturnValue({ data: null, error: null, isLoading: true });
    render(<Page />);
    expect(screen.getByText('Cargando resultados...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockUseSWR.mockReturnValue({ data: null, error: true, isLoading: false });
    render(<Page />);
    expect(screen.getByText('Vuelva mas tarde...')).toBeInTheDocument();
  });

  it('displays no results state', () => {
    mockUseSWR.mockReturnValue({ data: { items: [] }, error: null, isLoading: false });
    render(<Page />);
    expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument();
  });

  it('displays items correctly', () => {
    const mockData = {
      items: [
        { id: '1', picture: '/image1.jpg', title: 'Item 1', price: { amount: 1000 }, free_shipping: true },
        { id: '2', picture: '/image2.jpg', title: 'Item 2', price: { amount: 2000 }, free_shipping: false },
      ],
      categories: [{ name: 'Category 1' }, { name: 'Category 2' }, { name: 'Category 3' }, { name: 'Category 4' }],
    };
    mockUseSWR.mockReturnValue({ data: mockData, error: null, isLoading: false });
    render(<Page />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('navigates to item details page on item click', () => {
    const mockData = {
      items: [{ id: '1', picture: '/image1.jpg', title: 'Item 1', price: { amount: 1000 }, free_shipping: true }],
      categories: [{ name: 'Category 1' }, { name: 'Category 2' }, { name: 'Category 3' }, { name: 'Category 4' }],
    };
    mockUseSWR.mockReturnValue({ data: mockData, error: null, isLoading: false });
    render(<Page />);
    fireEvent.click(screen.getByText('Item 1'));
    expect(mockPush).toHaveBeenCalledWith('/items/1');
  });
});
