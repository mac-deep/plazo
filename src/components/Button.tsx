import React from 'react';

enum Variants {
  'black',
  'white',
  'red',
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof Variants;
};

const buttonVariants: { [K in ButtonProps['variant']]: string } = {
  black: 'bg-black border border-white text-white',
  white: 'bg-white border border-black text-black',
  red: 'bg-transparent border border-red-900 text-red-900',
};

export default function Button(props: ButtonProps) {
  const { children, className, variant = 'black', ...rest } = props;
  return (
    <button className={`px-4 py-2 ${className} ${buttonVariants[variant]}`} {...rest}>
      {children}
    </button>
  );
}
