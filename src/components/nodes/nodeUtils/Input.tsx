import React, { useEffect, useRef, useState } from "react";
import useDocumentEvent from "../../../hooks/useDocumentEvent";

type InputProps = Omit<React.ComponentProps<"input">, "onChange" | "onMouseDown"> & {
  label?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void
}

export default function Input({ id, label, value, onChange, onMouseDown, ...props }: InputProps) {
  const [isDisplayShown, setDisplayShown] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    e.stopPropagation();
    onMouseDown?.(e);
  }

  useDocumentEvent("mousedown", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!inputRef.current?.contains(target) || inputRef.current !== target) {
      setDisplayShown(false);
    }
  }, { capture: true, attached: isDisplayShown });

  useEffect(() => {
    if (!inputRef.current) return;

    const width = inputRef.current.clientWidth;
    const scrollWidth = inputRef.current.scrollWidth;

    setDisplayShown(scrollWidth > width);
  }, [value]);

  return (
    <div className="node-input">
      {label !== undefined && <label htmlFor={id}>{label}</label> }
      <div className="input-wrapper">
        <input
          ref={inputRef}
          onMouseDown={handleClick}
          onChange={onChange}
          value={value}
          {...props}
        />
        {isDisplayShown && (
          <span className="text-display">{value}</span>
        )}
      </div>
    </div>
  );
}