
import AppRouter from "./routes";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { rootStore } from "./store/store";
import './App.scss';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={rootStore.store}>
        <PersistGate loading={null} persistor={rootStore.persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </MuiPickersUtilsProvider>

  );
}

export default App;