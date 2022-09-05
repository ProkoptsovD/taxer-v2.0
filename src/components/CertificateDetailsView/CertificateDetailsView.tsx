import { useStoreContext } from "../../hooks";
import styles from './CertificateDetailsView.module.css';

const CertificateDetailsView = () => {
    const store = useStoreContext();
    const certificate = store?.getCertificateToBeDisplayed();

    return (
        <>
            {
                certificate ?  <div className={ styles.wrapper }>
                                    <p>Common name: <span>{ certificate?.owner }</span></p>
                                    <p>Issuer CN: <span>{ certificate?.issuer }</span></p>
                                    <p>Valid from: <span>{ certificate?.validFrom }</span></p>
                                    <p>Valid till: <span>{ certificate?.validTill }</span></p>
                                </div>
                            : null
            }
        </>
    )
}

export default CertificateDetailsView;