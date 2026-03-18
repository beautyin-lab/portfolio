'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4',
      'sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col sm:max-w-[420px]',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const toastVariants = {
  success: {
    container: 'border-green-200 bg-green-50',
    icon: CheckCircle,
    iconClass: 'text-green-600',
  },
  error: {
    container: 'border-red-200 bg-red-50',
    icon: AlertCircle,
    iconClass: 'text-red-600',
  },
  info: {
    container: 'border-blue-200 bg-blue-50',
    icon: Info,
    iconClass: 'text-blue-600',
  },
  warning: {
    container: 'border-yellow-200 bg-yellow-50',
    icon: AlertTriangle,
    iconClass: 'text-yellow-600',
  },
} as const;

type ToastVariant = keyof typeof toastVariants;

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant;
}

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = 'info', children, ...props }, ref) => {
  const config = toastVariants[variant];
  const Icon = config.icon;

  return (
    <ToastPrimitive.Root
      ref={ref}
      duration={5000}
      className={cn(
        'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all',
        'data-[swipe=cancel]:translate-x-0',
        'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
        'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
        'data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
        config.container,
        className,
      )}
      {...props}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconClass)} />
      <div className="flex-1">{children}</div>
      <ToastPrimitive.Close
        className={cn(
          'shrink-0 rounded-md p-1 opacity-70 transition-opacity',
          'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
        )}
        aria-label="닫기"
      >
        <X className="h-4 w-4" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
});
Toast.displayName = 'Toast';

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors',
      'hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

// --- useToast hook ---

type ToastActionElement = React.ReactElement<typeof ToastAction>;

interface ToastData {
  id: string;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TOAST_LIMIT = 5;

type ActionType =
  | { type: 'ADD_TOAST'; toast: ToastData }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToastData> & Pick<ToastData, 'id'> }
  | { type: 'DISMISS_TOAST'; toastId: string }
  | { type: 'REMOVE_TOAST'; toastId: string };

interface State {
  toasts: ToastData[];
}

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: ActionType) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };
    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t,
        ),
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

function toast(props: Omit<ToastData, 'id' | 'open'>) {
  const id = genId();
  dispatch({ type: 'ADD_TOAST', toast: { ...props, id, open: true } });
  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (updateProps: Partial<ToastData>) =>
      dispatch({ type: 'UPDATE_TOAST', toast: { ...updateProps, id } }),
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId: string) =>
      dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

// --- Toaster component ---

function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...rest }) => (
        <Toast key={id} variant={variant} {...rest}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
Toaster.displayName = 'Toaster';

export {
  Toast,
  ToastAction,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  Toaster,
  useToast,
  toast,
  type ToastProps,
  type ToastVariant,
  type ToastData,
  type ToastActionElement,
};
