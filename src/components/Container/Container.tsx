import { ComponentProps } from "react";
import styles from './Container.module.css';

const Container = ({ children, ...restProps }: ComponentProps<any>) => {
    return (
        <div
            className={ styles.container }
            { ...restProps }
        >
            { children }
        </div>
    )
}

export default Container;