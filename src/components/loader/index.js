import { cn as bem } from '@bem-react/classname';
import './style.css';

const Loader = () => {
  const cn = bem('Loader');
  return <div className={cn()}></div>;
};

export default Loader;
