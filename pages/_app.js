import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  const {store, props} = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(App);
