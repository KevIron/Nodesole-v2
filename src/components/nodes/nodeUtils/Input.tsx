import React, { useEffect, useRef, useState } from "react";

type InputProps = React.ComponentProps<"input"> & {
  label?: string,
  onInput?: (e: React.InputEvent) => void
}

export default function Input({ label, onInput, ...props }: InputProps) {
  const [value, setValue] = useState("");
  const [isDisplayShown, setDisplayShown] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function handleInput(e: React.InputEvent) {
    if (!inputRef.current) return;

    setValue(inputRef.current.value);

    const width = inputRef.current.clientWidth;
    const scrollWidth = inputRef.current.scrollWidth;

    if (scrollWidth > width) {
      setDisplayShown(true);
    } else {
      setDisplayShown(false);
    }

    onInput?.(e);
  }

  useEffect(() => {
    if (!isDisplayShown) return;

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!inputRef.current?.contains(target)) {
        setDisplayShown(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick, true);
    return () => document.removeEventListener("mousedown", handleOutsideClick, true);
  }, [isDisplayShown]); 

  return (
    <div className="node-input">
      {label !== undefined && <label>{label}</label> }
      <div className="input-wrapper">
        <input
          ref={inputRef}
          onMouseDown={handleClick}
          onInput={handleInput}
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