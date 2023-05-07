import NavBarButton from "./NavBarButton";
import { homeIcon, notificationsIcon, profileIcon } from "./data";
import { DocumentIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  return (
    <nav className="flex flex-col gap-5 border-r-[1px] px-2 py-4 min-h-screen items-center tablet:flex lg:px-8">
      <div className="px-4">
        <DocumentIcon className="w-6 h-6" />
        <p>DocManager</p>
      </div>
      <div className="space-y-3">
        <NavBarButton Icon={DocumentIcon} name="Home" active={true} />
        <NavBarButton Icon={DocumentIcon} name="Home" active={false} />
        <NavBarButton Icon={DocumentIcon} name="Home" active={false} />
      </div>
    </nav>
  );
}
