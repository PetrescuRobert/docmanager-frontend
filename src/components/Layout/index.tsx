import NavBar from "../NavBar";
import Task from "../Task";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-[auto,1fr]  lg:max-w-7xl  mx-auto">
      <NavBar />
      <div>
        <Task />
        <Task />
      </div>
    </div>
  );
}
