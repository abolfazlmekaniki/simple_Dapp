import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
import WebApp from "@twa-dev/sdk";
import { MainButton } from '@twa-dev/sdk/react';


function App() {
  const action = useMainContract();

  const showAlert=()=>{
    WebApp.showAlert("hello world")
  }

  const { connected } = useTonConnect()
  
  
  return (
    <div className="main">
     
      <div className="tonwallet">
        <TonConnectButton />
      </div>
      <b>{WebApp.platform}</b>
      <MainButton text="Submit" onClick={() => alert('submitted')} />
      <div className="cards">
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{action.contract_address}</div>
        </div>

        <div className='Card'>
          <b>Our contract Balance</b>
          <div className='Hint'>{fromNano(action.contract_balance!)}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{action.counter_value ?? "Loading..."}</div>
        </div>
      </div>
      {connected && (
             <div className="Card" style={{display:"flex",flexDirection:"row"}}>
               <button
                onClick={() => {
                  action.sendIncrement();
                }}
              >
                Increment
              </button>

              <button
                onClick={() => {
                  action.sendDeposite();
                }}
              >
                deposit
              </button>

              <button
                onClick={() => {
                  action.sendWithdraw(); 
                }}
              >
                withdraw
              </button>

              <button
                onClick={() => {
                  showAlert();
                }}
              >
                show Alert
              </button>
             </div>
              
        )}
    </div>
  );
}

export default App;