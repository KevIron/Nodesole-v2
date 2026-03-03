import React, { useRef, useState } from "react"

import DropdownIcon from "./../../../assets/icons/dropdown_icon.svg?react"
import useDocumentEvent from "../../../hooks/useDocumentEvent";

type SelectProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  label?: string,
  options: string[],
  selectedItem: string,
  onChange: (e: { newValue: string, oldValue: string }) => void 
}

export default function Select({ label, options, selectedItem, onChange, ...props }: SelectProps) {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleShowDropdown(e: React.MouseEvent) {
    e.stopPropagation();
    setDropdownActive(true);
  }

  function handleSelectItem(e: React.MouseEvent, item: string) {
    e.stopPropagation();
    onChange({ oldValue: selectedItem, newValue: item });
  }

  useDocumentEvent("mousedown", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!dropdownRef.current?.contains(target) || dropdownRef.current !== target) {
      e.preventDefault();
      setDropdownActive(false);
    }
  }, { capture: true, attached: isDropdownActive });

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