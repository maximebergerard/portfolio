import { createContext, ReactNode, useState } from "react"

type Language = "en" | "fr" // Define your supported languages

interface LanguageContextProps {
  language: Language
  toggleLanguage: (newLanguage: Language) => void
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
