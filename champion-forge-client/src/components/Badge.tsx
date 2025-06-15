

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary"
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantClasses = {
    default: "bg-primary-100 text-primary-800",
    secondary: "bg-gray-100 text-gray-800",
  };

  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>;
};
