import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemPage from '@/app/items/[id]/page';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

// Mock the useParams hook
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

// Mock the useSWR hook
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Item Page', () => {
  const mockUseParams = useParams as jest.Mock;
  const mockUseSWR = useSWR as jest.Mock;

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state', () => {
    mockUseSWR.mockReturnValue({ data: null, error: null, isLoading: true });
    render(<ItemPage />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockUseSWR.mockReturnValue({ data: null, error: true, isLoading: false });
    render(<ItemPage />);
    expect(screen.getByText('Error al cargar el producto. Intente nuevamente más tarde.')).toBeInTheDocument();
  });

  it('displays item details correctly', () => {
    const mockData = {
      item: {
        id: '1',
        picture: '/image1.jpg',
        title: 'Item 1',
        price: { amount: 1000 },
        condition: true,
        description: 'Item 1 description',
      },
    };
    mockUseSWR.mockReturnValue({ data: mockData, error: null, isLoading: false });
    render(<ItemPage />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 1 description')).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Nuevo'))).toBeInTheDocument();
    expect(screen.getByText('Comprar')).toBeInTheDocument();
  });
});
