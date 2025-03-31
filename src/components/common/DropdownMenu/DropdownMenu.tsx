import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { RiMore2Line } from "@remixicon/react";

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
    return (
        <div className="flex shrink-0 items-center gap-x-6 flex justify-center relative">
            <Menu as="div" className="flex-none absolute zIndex-10 ">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Opciones</span>
                    <RiMore2Line size={20} aria-hidden="true" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:border-strokedark dark:bg-boxdark py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        {items.map((item, index) => (
                            <Menu.Item key={index}>
                                {({ active }) =>
                                    item.renderItem ? (
                                        item.renderItem(active) // Usar render personalizado si está presente
                                    ) : item.type === "link" && item.href ? (
                                        <Link
                                            to={item.href}
                                            className={`px-3 py-1 text-sm leading-6 flex items-center text-left justify-start gap-3.5 font-medium duration-300 ease-in-out lg:text-base ${item.ref ? item.ref : ""
                                                }`}
                                        >
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            className={`px-3 py-1 text-sm leading-6 flex items-center text-left justify-start gap-3.5 font-medium duration-300 ease-in-out lg:text-base ${item.ref ? item.ref : ""
                                                }`}
                                            onClick={item.onClick}
                                        >
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            {item.label}
                                        </button>
                                    )
                                }
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default DropdownMenu;
