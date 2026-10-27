import "./globals.css";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import site from "@/data/site.json";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import Toast from "@/components/cart/Toast";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${site.name} | Small Details, Big Style`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export const viewport = {
  themeColor: "#FFFCF5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="overflow-x-hidden">
        <noscript>
          <style>
            {".reveal{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileTabBar />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
