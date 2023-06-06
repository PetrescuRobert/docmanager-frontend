import { useContext } from 'react';
import NavBarButton from './NavBarButton';
import { homeIcon, notificationsIcon, profileIcon } from './data';
import { DocumentIcon } from '@heroicons/react/24/outline';
import UserContext from '../../contexts/UserContext';
import { Role } from '../../data/CONSTANTS';

export default function NavBar() {
  //get the user state from the context
  const { user } = useContext(UserContext);
  return (
    <nav className="flex flex-col gap-5 border-r-[1px] px-2 py-4 min-h-screen items-center tablet:flex lg:px-8">
      <div className="px-4">
        <DocumentIcon className="w-6 h-6" />
        <p>DocManager</p>
      </div>
      <div className="space-y-3">
        <NavBarButton
          Icon={DocumentIcon}
          name="Home"
          active={true}
          path="/home"
        />
        <NavBarButton
          Icon={DocumentIcon}
          name="Login"
          active={false}
          path="/login"
        />
        <NavBarButton
          Icon={DocumentIcon}
          name="Documents"
          active={false}
          path="/documents"
        />
        <NavBarButton
          Icon={DocumentIcon}
          name="Upload"
          active={false}
          path="/upload"
        />
        {user?.role === Role.MANAGER && (
          <NavBarButton
            Icon={DocumentIcon}
            name="Create Task"
            active={false}
            path="/create-task"
          />
        )}
      </div>
    </nav>
  );
}
