import { Dispatch, SetStateAction } from "react";
import { DecodedCertificate } from "./certificate";

export interface IStoreContext {
    certificates: DecodedCertificate[];
    displayedCertificateId: string;
    addCertificate: Function;
    setDisplayedCertificate: Function;
    getCertificateToBeDisplayed: Function;
}   
