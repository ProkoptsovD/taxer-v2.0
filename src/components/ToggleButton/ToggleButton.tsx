import { ComponentProps } from "react";
import styles from './ToggleButton.module.css';

interface IToggleButtonProps extends ComponentProps<any> {
    content: string
}

const ToggleButton = ({ content, ...btnProps }: IToggleButtonProps) => {
    return (
        <button
            className={ styles.button }
            { ...btnProps }
        >
            { content }
        </button>
    )
}

export default ToggleButton;