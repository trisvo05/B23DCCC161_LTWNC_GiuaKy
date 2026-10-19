import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

const variants = cva("ui-button", {
  variants: {
    variant: { primary: "ui-button-primary", outline: "ui-button-outline", ghost: "ui-button-ghost" },
    size: { default: "ui-button-default", small: "ui-button-small", icon: "ui-button-icon" },
  },
  defaultVariants: { variant: "primary", size: "default" },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof variants> & { asChild?: boolean };

export function Button({ asChild, className, variant, size, ...props }: Props) {
  const Component = asChild ? Slot : "button";
  return <Component className={clsx(variants({ variant, size }), className)} {...props} />;
}
