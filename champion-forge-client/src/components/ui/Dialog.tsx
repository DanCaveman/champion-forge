import { cn } from "@/lib/utils"
import { cloneElement, createContext, forwardRef, isValidElement, useContext, useState } from "react"

interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

const Dialog = ({
  children,
  open,
  onOpenChange,
}: { 
    children: React.ReactNode; 
    open?: boolean; 
    onOpenChange?: (open: boolean) => void }) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open !== undefined ? open : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  return <DialogContext.Provider value={{ open: isOpen, onOpenChange: setOpen }}>{children}</DialogContext.Provider>
}

const DialogTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error("DialogTrigger must be used within Dialog")

  const handleClick = () => context.onOpenChange(true)

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, { onClick: handleClick })
  }

  return <button onClick={handleClick}>{children}</button>
}

const DialogContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { className?: string }>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(DialogContext)
    if (!context) throw new Error("DialogContent must be used within Dialog")

    if (!context.open) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={() => context.onOpenChange(false)} />
        <div
          ref={ref}
          className={cn(
            "relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  },
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DialogDescription.displayName = "DialogDescription"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
