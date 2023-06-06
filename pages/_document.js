import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Agrega aquí los enlaces a tus fuentes personalizadas */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          {/* EL bootstrap */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      
          {/* google Font  */}
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@200;300;400&family=Nunito:ital,wght@0,200;0,400;1,200&family=Roboto:wght@300;400&display=swap" rel="stylesheet"/>
          {/* Fontawesome  ICONS*/}
          <script src="https://kit.fontawesome.com/c321b0e5bf.js" crossorigin="anonymous"></script>
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



