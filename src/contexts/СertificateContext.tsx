import { createContext, PropsWithChildren } from "react";
import { useParseCertificate } from "../hooks";
import { ICertificateContext } from "../interfaces/certificate";

export const CertificateContext = createContext<ICertificateContext | null>(null);

export const CertificateContextProvider = ({ children }: PropsWithChildren) => {
    const cert = useParseCertificate();

    return (
        <CertificateContext.Provider value={cert}>
            { children }
        </CertificateContext.Provider>
    )
}