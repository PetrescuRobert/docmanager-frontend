import { NavBarButtonProps } from "./data";

export default function NavBarButton({
  Icon,
  name,
  active,
}: NavBarButtonProps) {
  return (
    <a href="#" className="flex-group">
      <div className="flex gap-4 items-center group-hover:bg-neutral-200 desktop:px-4 px-3 py-3 rounded-full hover-transition">
        <Icon className="w-4 h-4" />
        <span className={`${active ? "font-bold" : ""}  desktop:block`}>
          {name}
        </span>
      </div>
    </a>
  );
}
