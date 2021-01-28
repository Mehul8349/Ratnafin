import { createContext } from "react";
import { DocumentContextType } from "./types";

export const DocumentContext = createContext<DocumentContextType | null>(null);
