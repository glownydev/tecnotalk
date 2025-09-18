declare module '@/stores/auth' {
  interface AuthStore {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
  }

  export function useAuth(): AuthStore;
}

declare module '@/lib/utils' {
  export function cn(...inputs: (string | undefined)[]): string;
}