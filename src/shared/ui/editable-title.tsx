"use client";

import type { KeyboardEvent } from "react";

import { useEffect, useRef, useState } from "react";
import { Input } from "@heroui/react";
import clsx from "clsx";

export type EditableTitleProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const EditableTitle = ({
  value,
  onChange,
  placeholder,
  className,
}: EditableTitleProps) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  const stopEditing = () => setEditing(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      stopEditing();
    }
  };

  return editing ? (
    <Input
      ref={ref}
      className={className}
      placeholder={placeholder}
      size="lg"
      value={value}
      variant="underlined"
      onBlur={stopEditing}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <button
      className={clsx(
        "bg-transparent cursor-text p-0 text-left text-3xl font-bold",
        className,
      )}
      type="button"
      onClick={() => setEditing(true)}
    >
      {value || placeholder}
    </button>
  );
};
