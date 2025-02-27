import { RiArrowLeftSLine } from 'react-icons/ri';

const BackLink = ({ text, link, iconSize = 20, className = '' }: BackLinkProps) => {
  return (
    <div className={`border-b border-stroke py-4 px-6 dark:border-strokedark ${className}`}>
      <a href={link} className="flex items-center dark:text-white text-title-xsm font-semibold text-primary">
        <RiArrowLeftSLine size={iconSize} className="mr-2" />
        {text}
      </a>
    </div>
  );
};

export default BackLink;
