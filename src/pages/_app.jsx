import Head from "next/head";
import { Roboto } from "next/font/google";
import { Container, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import { store } from "../states";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CssBaseline />
      <Provider store={store}>
        <Container component="main" maxWidth="xl" className={roboto.className}>
          <Component {...pageProps} />
        </Container>
      </Provider>
    </>
  );
}
