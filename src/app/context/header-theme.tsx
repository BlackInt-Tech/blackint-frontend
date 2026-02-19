import { createContext, useContext, useState } from "react";

type HeaderTheme = "primary" | "inverse";

interface HeaderThemeContextType {
  theme: HeaderTheme;
  setTheme: (theme: HeaderTheme) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const HeaderThemeContext = createContext<HeaderThemeContextType | null>(null);

export function HeaderThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<HeaderTheme>("primary");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderThemeContext.Provider
      value={{ theme, setTheme, isMenuOpen, setIsMenuOpen }}
    >
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) {
    throw new Error("useHeaderTheme must be used inside HeaderThemeProvider");
  }
  return ctx;
}
