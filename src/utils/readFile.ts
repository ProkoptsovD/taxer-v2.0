import * as x509 from "@peculiar/x509";
import { getNameFromCertificate } from "./getNameFromCertificate";
import { normalizeDateTime } from "./normalizeDateTime";

const redexpBase64 = /(?<=,).*$/;

export const readFile = (
  file: File,
  callback: Function,
  hasError: Function
): void => {
  const reader = new FileReader();
  reader.onload = (): void => {
    const contentRaw = reader.result?.toString() ?? '';
    const base64 = contentRaw.match(redexpBase64)?.join() ?? '';

    try {
      const cert = new x509.X509Certificate(base64);

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
};