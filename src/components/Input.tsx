import { InputHTMLAttributes } from "react";

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    labelHTMLFor: string
}

export function Input({ label, labelHTMLFor, ...rest }: TInputProps) {
    return (
        <>
            <label htmlFor={labelHTMLFor} className="text-2xl">
                {label}
            </label>
            <input
                id={labelHTMLFor}
                className="max-w-[50vw] bg-transparent outline-none border-b-4 border-secondary text-2xl transition-all focus:border-primary"
                {...rest}
            />
        </>
    );
}