import { ComponentProps, useRef, DragEvent, useEffect } from "react";
import { useCertificateContext, useStoreContext } from "../../hooks";
import styles from './DropZone.module.css';

interface DropZoneProps extends ComponentProps<any> {
    close: Function
}

const DropZone = ({ close }: DropZoneProps) => {
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const store = useStoreContext();
    const cert = useCertificateContext();

    useEffect(() => {
        if(cert?.isDecoded) {
            store?.addCertificate(cert?.certificate);
            cert?.reset();
            close()
        }

    }, [cert, store, close ])
    
    const handleDrop = (event: DragEvent): void => {
        event.preventDefault();
        console.log(event.dataTransfer.files)
        const uploadedFile = event.dataTransfer.files[0];
        
        cert?.setFile(uploadedFile);
    }
    const handleDragOver = (event: DragEvent): void => event.preventDefault();
    const handleDragEnter = () => dropZoneRef.current?.classList.add(styles.dragEnter);
    const handleDragLeave = () => dropZoneRef.current?.classList.remove(styles.dragEnter);

    return (
        <div
            ref={ dropZoneRef }
            onDragOver={ handleDragOver }
            onDrop={ handleDrop }
            onDragEnter={ handleDragEnter }
            onDragLeave={ handleDragLeave }
            className={ styles.dropZone }
        >
        </div>
    )
}

export default DropZone;