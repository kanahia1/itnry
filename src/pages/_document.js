import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
