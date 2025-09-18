export interface ToastProps {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  action?: React.ReactNode;
  dismiss?: () => void;
}

export type ToastActionElement = React.ReactElement;