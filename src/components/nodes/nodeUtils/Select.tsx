import React, { useEffect, useRef, useState } from "react"
import DropdownIcon from "./../../../assets/icons/dropdown_icon.svg?react"

type SelectProps = React.ComponentProps<"div"> & {
  label?: string,
  options: string[],
  value?: string,
}

export default function Select({ label, options, value, ...props }: SelectProps) {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleShowDropdown(e: React.MouseEvent) {
    e.stopPropagation();
    setDropdownActive(true);
  }

  function handleSelectItem(e: React.MouseEvent, item: string) {
    e.stopPropagation();

    setSelectedItem(item);
    setDropdownActive(false);
  }

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  useEffect(() => {
    if (!isDropdownActive) return;

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!dropdownRef.current?.contains(target)) {
        e.preventDefault();
        setDropdownActive(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick, true);
    return () => document.removeEventListener("mousedown", handleOutsideClick, true);
  }, [isDropdownActive]); 

  return (
    <div className="node-select" {...props}>
      {label !== undefined && <label>{label}</label> }
      <div className="select-outer" onMouseDown={handleShowDropdown}>
        <div className="select-display">
          <span>{selectedItem}</span>
          <DropdownIcon />
        </div>
        <div 
          ref={dropdownRef}
          className={`select-inner ${isDropdownActive ? "active" : ""}`}
        >
          {options.map(option => (
            <span 
              className="select-option" 
              key={option} 
              onMouseDown={(e) => handleSelectItem(e, option)} 
            >
              {option}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}