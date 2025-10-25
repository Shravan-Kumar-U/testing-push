import { ReactElement } from "react";

export function SideItem({text, icon}: {
    text: string,
    icon: ReactElement
}){
    return (
        <div className="flex text-gray-400 py-2 cursor-pointer hover:bg-gray-300 hover:text-black rounded-xl max-w-57 pl-4 transition-all duration-600">
            <div className="pr-2 ">
            {icon}
            </div>
            <div>

                 {text}
            </div>
        </div>
    )
}