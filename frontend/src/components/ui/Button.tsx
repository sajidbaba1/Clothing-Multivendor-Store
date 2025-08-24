import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type MotionButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>

interface ButtonProps extends MotionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed'
const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
}
const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-soft',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', loading, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        className={clsx(base, sizes[size], variants[variant], className)}
        ref={ref}
        {...props}
      >
        {loading ? 'Please wait…' : children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
