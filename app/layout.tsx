
import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/100.css";
import "@fontsource/be-vietnam-pro/100-italic.css";
import "@fontsource/be-vietnam-pro/200.css";
import "@fontsource/be-vietnam-pro/200-italic.css";
import "@fontsource/be-vietnam-pro/300.css";
import "@fontsource/be-vietnam-pro/300-italic.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/500-italic.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/600-italic.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/700-italic.css";
import "@fontsource/be-vietnam-pro/800.css";
import "@fontsource/be-vietnam-pro/800-italic.css";
import "@fontsource/be-vietnam-pro/900.css";
import "@fontsource/be-vietnam-pro/900-italic.css";
import { AppProviders } from "@/src/app/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Library | Thư viện UDU",
  description: "Tra cứu và mượn sách chuyên ngành tại thư viện UDU.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="vi" data-scroll-behavior="smooth"><body><AppProviders>{children}</AppProviders></body></html>;
}
