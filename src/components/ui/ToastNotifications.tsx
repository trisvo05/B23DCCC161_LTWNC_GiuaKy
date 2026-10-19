"use client";

import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useTheme } from "@/src/context/ThemeContext";
import { setWarning } from "@/src/features/books/booksSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";

export function ToastNotifications() {
  const warning = useAppSelector((state) => state.books.warning);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    if (!warning) return;
    toast.warning(warning, { id: "borrow-limit" });
    dispatch(setWarning(null));
  }, [warning, dispatch]);

  return <Toaster theme={theme} position="top-right" richColors visibleToasts={1} />;
}
