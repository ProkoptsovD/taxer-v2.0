import { CertificateFields, Certificate } from "../interfaces/certificate";

const types: CertificateFields = {
    issuerName: '2.5.4.11',
    subjectName: '2.5.4.3',
}

export const  getNameFromCertificate = (certificate: any, keyName: string) => {
    const type = types[keyName as keyof CertificateFields];
    const prop = certificate[keyName as keyof Certificate]?.asn;
    const keys = Object.keys(prop);

    let name;
    keys.forEach(key => {
        if(prop[key][0]?.type === type) {
            name = prop[key][0]?.value?.utf8String;
        }
    })
    return name;
};