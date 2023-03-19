import "../styles/globals.css";
import "../styles/custom_global.scss";

import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";

import { StoreProvider } from "easy-peasy";
import { store } from "../features/userData";

const supportedChainIds = [137, 1337, 80001, 4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <Component {...pageProps} />
      </ThirdwebWeb3Provider>
    </StoreProvider>
  );
}

export default MyApp;
