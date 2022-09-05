import { ComponentProps, useEffect, useCallback } from "react";
import {useDropzone} from 'react-dropzone'
import { useCertificateContext, useStoreContext } from "../../hooks";
import styles from './DropZone.module.css';

interface DropZoneProps extends ComponentProps<any> {
    close: Function
}

const DropZone = ({ close }: DropZoneProps) => {
    // const dropZoneRef = useRef<HTMLDivElement>(null);
    const store = useStoreContext();
    const cert = useCertificateContext();
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        
        cert?.setFile(uploadedFile);
    }, [cert])
    
    const {getRootProps, getInputProps } = useDropzone({onDrop})

    useEffect(() => {
        if(cert?.isDecoded) {
            store?.addCertificate(cert?.certificate);
            cert?.reset();
            close()
        }

    }, [cert, store, close ])
    
    // const handleDrop = (event: DragEvent): void => {
    //     event.preventDefault();
    //     console.log(event.dataTransfer.files)
    //     const uploadedFile = event.dataTransfer.files[0];
        
    //     cert?.setFile(uploadedFile);
    // }
    // const handleDragOver = (event: DragEvent): void => event.preventDefault();
    // const handleDragEnter = () => dropZoneRef.current?.classList.add(styles.dragEnter);
    // const handleDragLeave = () => dropZoneRef.current?.classList.remove(styles.dragEnter);

    return (
        <div
            // ref={ dropZoneRef }
            // onDragOver={ handleDragOver }
            // onDrop={ handleDrop }
            // onDragEnter={ handleDragEnter }
            // onDragLeave={ handleDragLeave }
            {...getRootProps()}
            className={ styles.dropZone }
        >
            <input {...getInputProps()} />
        </div>
    )
}

export default DropZone;