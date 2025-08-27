import type { ReactNode } from "react";

export { HeroUIProvider } from "@heroui/system";
export { Link } from "@heroui/link";
export {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
export { type SwitchProps, useSwitch } from "@heroui/switch";
export { Input } from "@heroui/input";
export { Button } from "@heroui/button";

export type CardProps = { children: ReactNode };
export const Card = ({ children }: CardProps) => (
  <div className="border rounded-lg p-4">{children}</div>
);

export type CardHeaderProps = { children: ReactNode };
export const CardHeader = ({ children }: CardHeaderProps) => (
  <div className="mb-2 font-bold">{children}</div>
);

export type CardBodyProps = { children: ReactNode };
export const CardBody = ({ children }: CardBodyProps) => <div>{children}</div>;

export type ModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};
export const Modal = ({ isOpen, onOpenChange, children }: ModalProps) => {
  if (!isOpen) return null;
  const close = () => onOpenChange(false);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={close}
    >
      <div
        className="bg-background p-4 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export type ModalContentProps = { children: ReactNode };
export const ModalContent = ({ children }: ModalContentProps) => <>{children}</>;

export type ModalHeaderProps = { children: ReactNode };
export const ModalHeader = ({ children }: ModalHeaderProps) => (
  <h2 className="text-xl font-bold mb-4">{children}</h2>
);

export type ModalBodyProps = { children: ReactNode };
export const ModalBody = ({ children }: ModalBodyProps) => (
  <div className="flex flex-col gap-2">{children}</div>
);

export type ModalFooterProps = { children: ReactNode };
export const ModalFooter = ({ children }: ModalFooterProps) => (
  <div className="flex justify-end gap-2 mt-4">{children}</div>
);

export type SliderProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
  step?: number;
};
export const Slider = ({
  label,
  value,
  onChange,
  maxValue = 100,
  step = 1,
}: SliderProps) => (
  <label className="w-full">
    {label && <span className="block text-sm mb-1">{label}</span>}
    <input
      type="range"
      min={0}
      max={maxValue}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
    <span className="text-sm">{value}%</span>
  </label>
);
