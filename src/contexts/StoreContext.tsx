import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { storageKeys } from "../constants/storageKeys";
import { DecodedCertificate } from "../interfaces/certificate";
import { IStoreContext } from "../interfaces/store";
import { storage } from "../services/storage";
import { generateId } from "../utils/generateId";
import { initializeState } from "../utils/initializeState";

export const StoreContext = createContext<IStoreContext | null>(null);

export const StoreContextProvider = ({ children }: PropsWithChildren) => {
    const [certificates, setCertificates] = useState<DecodedCertificate[]>(initializeState(storageKeys.certificates, []));
    const [displayedCertificateId, setDisplayedCertificateId] = useState<string>(initializeState(storageKeys.displayedCertificateId, ''));

    useEffect(() => {
        storage.save(storageKeys.certificates, certificates);
        storage.save(storageKeys.displayedCertificateId, displayedCertificateId);

    }, [certificates, displayedCertificateId]);

    const addCertificate = (cert: DecodedCertificate) => {
        const id = generateId();
        cert.id = id;
        setCertificates(prevCerts => [...prevCerts, cert]);
        setDisplayedCertificateId(id);
    }
    const setDisplayedCertificate = (id: string) => setDisplayedCertificateId(id);
    const getCertificateToBeDisplayed = () => certificates.find(({ id }: DecodedCertificate) => id === displayedCertificateId);

    return (
        <StoreContext.Provider value={{certificates, addCertificate, displayedCertificateId, setDisplayedCertificate, getCertificateToBeDisplayed}}>
            { children }
        </StoreContext.Provider>
    )
}