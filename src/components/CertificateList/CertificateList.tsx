import { ComponentProps } from "react";
import { useStoreContext } from "../../hooks";
import { DecodedCertificate } from "../../interfaces/certificate";
import styles from './Certificate.module.css';

interface ICertificateListProps {
    certificates: DecodedCertificate[];
    disable: boolean;
    restProps?: ComponentProps<any>;
}

const CertificateList = ({ certificates, disable }: ICertificateListProps) => {
    const store = useStoreContext();
    const selectedCertificateId = store?.displayedCertificateId;

    return (
        <ul className={ styles.list }>
            {
                certificates?.map(({ id, owner }: DecodedCertificate) => {
                    const disabled = disable ? '' : styles.notDisabled;
                    const selected = (selectedCertificateId === id && !disable) ? styles.selected : '';
                    const listItemCss = `${styles.listItem} ${disabled} ${selected}`;

                    return (
                        <li
                            key={ id }
                            onClick={() => !disable && store?.setDisplayedCertificate(id)}
                            className={ listItemCss }
                        >
                            { owner }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default CertificateList;