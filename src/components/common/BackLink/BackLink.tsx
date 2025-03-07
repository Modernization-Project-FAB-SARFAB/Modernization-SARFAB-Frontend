import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BackLinkProps } from './BackLinkProps.types';

const BackLink = ({ text, link, icon: Icon = RiArrowLeftSLine, iconSize = 20, className = '',  onClick, useRouter = false }: BackLinkProps) => {
  const content = (
    <span className="flex items-center dark:text-white text-title-xsm font-semibold text-primary">
      <Icon size={iconSize} className="mr-2" />
      {text}
    </span>
  );

  return (
    <div className={`border-b border-stroke py-4 px-6 dark:border-strokedark ${className}`}>
      {useRouter ? (
        <Link to={link} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <a href={link} onClick={onClick}>
          {content}
        </a>
      )}
    </div>
  );
};

export default BackLink;
