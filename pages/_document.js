import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Agrega aquí los enlaces a tus fuentes personalizadas */}
          <link rel="stylesheet" href="URL_DE_TU_FUENTE_PERSONALIZADA" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;



