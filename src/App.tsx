import { useEffect, useState } from 'react';
import { useCertificateContext, useStoreContext } from './hooks';

import DropZone from './components/DropZone';
import CertificateList from './components/CertificateList';
import ToggleButton from './components/ToggleButton';
import CertificateDetailsView from './components/CertificateDetailsView';

import styles from './App.module.css';
import Container from './components/Container';
import { messages } from './constants/messages';

function App() {
  const [ shouldShowDropZone, setShouldShowDropZone ] = useState(false);
  const [ tipContent, setTipContent ] = useState(messages.readCert);
  const store = useStoreContext();
  const cert = useCertificateContext();

  const hasCertificates = !!store?.certificates.length;
  const shouldShowCertificateDetails = !shouldShowDropZone && hasCertificates;
  const shouldShowTip = store?.displayedCertificateId === '' || shouldShowDropZone;

  const buttonContent = shouldShowDropZone ? 'Скасувати' : 'Додати';

  // styles
  const vieBoxCss = `${styles.viewBox} ${shouldShowDropZone ? styles.dropZone : ''}`;

  useEffect(() => {
    if(cert?.error) {
      setTipContent(messages.error);
      return;
    }

  }, [cert]);

  const closeDropZone = () => {setShouldShowDropZone(false); cert?.reset()};
  const toggleDropZoneAndCertificateDetailsView = () => {
    if(shouldShowDropZone) {
      store?.setDisplayedCertificate('');
      setTipContent(messages.readCert);
    } else {
      setTipContent(messages.addCert);
    };

    setShouldShowDropZone(!shouldShowDropZone);
  };

  return (
    <Container>
      <div className={ styles.wrapper }>
        {
          hasCertificates ? <CertificateList 
                                certificates={store.certificates}
                                disable={ shouldShowDropZone }
                            />
                          : <p className={ styles.noCerts }>{ messages.noCertificates }</p>
        }
        
        <ToggleButton
          onClick={ toggleDropZoneAndCertificateDetailsView }
          content={ buttonContent }
        />
      </div>
      
      <div className={ vieBoxCss }>
        { shouldShowTip && <p className={ styles.tip }>{ tipContent }</p> }
        { shouldShowDropZone && <DropZone close={ closeDropZone } /> }
        { shouldShowCertificateDetails && <CertificateDetailsView /> }
      </div>
    </Container>
  );
}

export default App;
