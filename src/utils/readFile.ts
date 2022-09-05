import * as x509 from "@peculiar/x509";
import { getNameFromCertificate } from "./getNameFromCertificate";
import { normalizeDateTime } from "./normalizeDateTime";

const regexpBase64 = /^data:application\/x-x509-ca-cert;base64,/gmi

export const readFile = (file: File, callback: Function, hasError: Function): void => {    
    const reader = new FileReader();
    reader.onload = (): void => { 
        const contentRaw = reader.result;
        const base64 = contentRaw?.toString().replace(regexpBase64, '');

        try {
            const cert = new x509.X509Certificate(base64 ?? '');

            const issuer = getNameFromCertificate(cert, 'issuerName');
            const owner = getNameFromCertificate(cert, 'subjectName');
            const validFrom = normalizeDateTime(cert.notBefore);
            const validTill = normalizeDateTime(cert.notAfter);

            callback({ issuer, owner, validFrom, validTill });
        } catch (error) {
            console.log(error);
            hasError(error);
        }
    };
    reader.readAsDataURL(file);
}