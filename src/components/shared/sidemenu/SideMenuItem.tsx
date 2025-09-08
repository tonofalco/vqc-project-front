
import type { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface Props {
  href: string;
  Icon: IconType;
  title: string;
<<<<<<< HEAD
  subTitle: string
}


export const SideMenuItem = ({ href, Icon, title, subTitle }: Props) => {
=======
  subTitle: string;
  onClick?: () => void;
}


export const SideMenuItem = ({ href, Icon, title, subTitle, onClick }: Props) => {
>>>>>>> aa681ca (first commit)
  return (
    <NavLink
      key={ href }
      to={ href }
<<<<<<< HEAD
=======
      onClick={ onClick }
>>>>>>> aa681ca (first commit)
      end
    >
      <div>
        <Icon />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{ title }</span>
        <span className="text-sm text-white/50 hidden md:block">{ subTitle }</span>
      </div>
    </NavLink>
  );
}