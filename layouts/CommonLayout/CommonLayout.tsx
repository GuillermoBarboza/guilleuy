// write a basic layout component named CommonLayout that wraps all pages

import React from 'react';
import { FC } from 'react';
import type { AppProps } from 'next/app'

import styles from './CommonLayout.module.scss';

import Nav from '../../components/Nav/Nav';

export type CommonLayoutProps = {
    children: React.ReactNode;
};

export const CommonLayout: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    return (
        <div className={styles.container}>
            <Nav />
            <Component {...pageProps} />
        </div>
    );
};

