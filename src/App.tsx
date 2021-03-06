import React, {  useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getPhantomWallet,
    getSolletWallet,
  } from '@solana/wallet-adapter-wallets';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ConnectedPool from "./pages/connected/Connected";
import PoolList from './pages/pool/Pool';
import PoolDetails from './pages/pool-details/PoolDetails'
import InteractionDetails from './pages/interaction-details/interaction-details';
import Farming from "./pages/farming/farming";
import SwapPool from "./pages/swap/swap";
import Liquidity from "./pages/liquidity/Liquidity";
import ErrorMessage from "./pages/error/error";
import BuilderList  from "./pages/builder/Builder";
import CompareList  from "./pages/compare/Compare";
import Wallet  from "./pages/wallet/Wallet";

import { Provider } from 'react-redux'
import store from "./app/store";

function App() {
  const network = "https://solana-api.projectserum.com";
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolletWallet({ network: "htpps://api.mainnet-beta.solana.com" as WalletAdapterNetwork }),
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={network}>
	<WalletProvider wallets={wallets}>
	
           
  	<Provider store={store}>
	    <HashRouter>
	      <Switch>
	          <Route
	          exact
	          path="/"
	          render={() => <Redirect to="/dashboard" />}
	        />
	        <PublicRoute path="/builder" component={BuilderList} />
	        <PublicRoute path="/compare" component={CompareList} />
	        <PublicRoute path="/dashboard" component={Dashboard} />
	        <PublicRoute path="/connected-pool" component={ConnectedPool} />
	        <PublicRoute path="/pools/:id" component={PoolDetails} />
	        <PublicRoute path="/pools" component={PoolList} />
	        <PublicRoute path="/login" component={Login} />
	        <PublicRoute path="/liquidity" component={Liquidity} />
	        <PublicRoute path="/swap" component={SwapPool} />
	        <PublicRoute path="/farming" component={Farming} />
	        <PublicRoute path="/error" component={ErrorMessage} />
	        <PublicRoute path="/interaction-details" component={InteractionDetails} />
	        <PublicRoute path="/wallet" component={Wallet} />
	      </Switch>
	    </HashRouter>
  	</Provider>
	  </WalletProvider>
        </ConnectionProvider>
  );
  
  function PublicRoute({ component, ...rest } : any) {
    return (
      <Route
        {...rest}
        render={props =>
         (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}

export default App;
