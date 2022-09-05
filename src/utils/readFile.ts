import * as x509 from "@peculiar/x509";
import { getNameFromCertificate } from "./getNameFromCertificate";
import { normalizeDateTime } from "./normalizeDateTime";

const regexpBase64Win = /^data:application\/x-x509-ca-cert;base64,/gmi
const regexpBase64Linux = /^data:application\/octet-stream;base64,/gmi

export const readFile = (file: File, callback: Function, hasError: Function): void => {    
    const reader = new FileReader();
    reader.onload = (): void => { 
        let regexp: RegExp = regexpBase64Win;
        const contentRaw = reader.result?.toString() ?? '';
        const isLinux = regexpBase64Linux.test(contentRaw);
        const isWindows = regexpBase64Win.test(contentRaw);

        if(isLinux) regexp = regexpBase64Linux;
        if(isWindows) regexp = regexpBase64Win;
        
        const base64 = contentRaw?.toString().replace(regexp, '');

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