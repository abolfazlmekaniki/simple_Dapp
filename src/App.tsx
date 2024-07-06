import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposite,
    sendWithdraw
  } = useMainContract();

  const { connected } = useTonConnect()
  
  
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{fromNano(contract_balance!)}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
      </div>
      {connected && (
             <div style={{display:"flex",flexDirection:"column"}}>
               <a
                onClick={() => {
                  sendIncrement();
                }}
              >
                Increment
              </a>

              <a
                onClick={() => {
                  sendDeposite();
                }}
              >
                deposit
              </a>

              <a
                onClick={() => {
                  sendWithdraw();
                }}
              >
                withdraw
              </a>
             </div>
              
        )}
    </div>
  );
}

export default App;