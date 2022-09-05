import { Dispatch, SetStateAction } from "react";

export interface Certificate {
    issuer: string;
    subject: string;
    notBefore: string;
    notAfter: string;
    subjectName?: any;
    issuerName?: any;
}
export interface DecodedCertificate {
    issuer: string;
    owner: string;
    validFrom: string;
    validTill: string;
    id?: string;
}

export interface CertificateFields {
    issuerName: string;
    subjectName: string;
}

export interface ICertificateContext {
    certificate: DecodedCertificate;
    setFile: Dispatch<SetStateAction<null | File>>;
    isDecoded: boolean;
    error: Error | null;
    reset: Function;
}