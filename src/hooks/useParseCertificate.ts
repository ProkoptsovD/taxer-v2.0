import { useEffect, useState } from "react";
import { DecodedCertificate } from "../interfaces/certificate";
import { readFile } from "../utils/readFile"; 

const initialState = { issuer: '', owner: '', validFrom: '', validTill: ''}

export const useParseCertificate = () => {
    const [ file, setFile ] = useState<null | File>(null);
    const [ error, setError ] = useState<null | Error>(null);
    const [ isDecoded, setIsDecoded ] = useState(false);
    const [ certificate, setCertificate ] = useState<DecodedCertificate>(initialState);

    const reset = () => {
        setFile(null);
        setIsDecoded(false);
        setCertificate(initialState);
        setError(null);
    }

    useEffect(() => {
        if(file instanceof File) {
            readFile(
                file,
                (cert: DecodedCertificate) => { setCertificate(cert); setIsDecoded(true); },
                (err: Error) => setError(err)
            );
        }

    }, [file])

    return { certificate, setFile, isDecoded, error, reset };
};