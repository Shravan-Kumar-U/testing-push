import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon ?: ReactElement;
    onClick?: () => void;
    loading?:boolean
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const styleVariant = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

const defaultSizes = "rounded-md p-4 flex items-center m-2 font-normal cursor-pointer"

export const Button = (props: ButtonProps) => {
    return <>
    <button disabled={props.loading} onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultSizes} ${styleVariant[props.size]} flex justify-center items-center ${props.loading ? "opacity-45": ""}`} >
        {props.startIcon ? <span className="pr-2"> {props.startIcon}</span> : null} <span>{props.text}</span> {props.endIcon ? <div className="pl-2">{props.endIcon}</div>: null}
        </button>
    </>
}

