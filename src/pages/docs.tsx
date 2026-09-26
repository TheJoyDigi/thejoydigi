import React from 'react';
import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Docs = () => {
  return (
    <>
      <Head>
        <title>API Docs | The Joy Digi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SwaggerUI url="/swagger.yaml" />
    </>
  );
};

export default Docs;
