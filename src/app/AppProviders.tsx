"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastNotifications } from "@/src/components/ui/ToastNotifications";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { store } from "@/src/store/store";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <ToastNotifications />
      </ThemeProvider>
    </Provider>
  );
}
