

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea className={`input min-h-[80px] resize-vertical ${className}`} {...props} />
    </div>
  );
};
