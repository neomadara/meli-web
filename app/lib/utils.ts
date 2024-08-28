export function formatPriceToCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(amount);
}


// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
