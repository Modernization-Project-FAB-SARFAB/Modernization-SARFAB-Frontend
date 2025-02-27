import { Link } from "react-router-dom";

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="my-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xsm font-semibold uppercase text-secondary dark:text-white">
        {items[0]?.label}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.path ? (
                <Link to={item.path} className="text-gray-500 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary">{item.label}</span>
              )}
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;