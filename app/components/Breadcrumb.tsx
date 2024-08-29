// Breadcrumb.tsx
interface BreadcrumbProps {
  categories: { name: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => (
  <p className={'text-black text-left pb-3.5'}>
    {categories.map((category, index) => (
      <span key={index}>{category.name}{index < categories.length - 1 ? ' > ' : ''}</span>
    ))}
  </p>
);

export default Breadcrumb;
