import React from 'react';
import type {AppProps} from 'next/app';
import Navbar from "../components/Navbar";

import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp
