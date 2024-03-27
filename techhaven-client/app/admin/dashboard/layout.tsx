"use client";
import { RootState } from "@/app/lib/store";

import { useSelector } from "react-redux";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <main className="bg-silver">
            <div className="flex w-full flex-row h-screen">
                <aside className="flex flex-col w-[200px] bg-licorice py-5 px-2">
                    <div>
                        <h1 className="p-1 px-2 text-white">Techhaven</h1>
                    </div>
                    <div className="flex-row flex mt-4 p-2">
                        <img src="" alt="profile" className="w-2 h-2" />
                        <h1 className="text-white font-semibold text-xs">
                            {user.firstName}
                        </h1>
                    </div>
                    <ul className="text-white text-sm leading-20 text-left mt-9">
                        <li className="p-1 rounded px-2">Dashboard</li>
                        <li className="p-1 rounded px-2">Catalog</li>
                        <li className="p-1 rounded px-2">Orders</li>
                    </ul>
                </aside>
                {children}
            </div>
        </main>
    );
};

export default RootLayout;
