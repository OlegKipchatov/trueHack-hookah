"use client";

import type { KeyboardEvent } from "react";

import { Input } from "@heroui/react";

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
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Input
      className={className}
      classNames={{
        inputWrapper: "bg-transparent! px-0",
        input: "text-3xl font-bold",
      }}
      placeholder={placeholder}
      size="lg"
      value={value}
      variant="flat"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
