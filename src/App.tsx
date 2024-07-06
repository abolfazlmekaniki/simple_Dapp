import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";

function App() {
  const action = useMainContract();

  const { connected } = useTonConnect()
  
  
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{action.contract_address}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{fromNano(action.contract_balance!)}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{action.counter_value ?? "Loading..."}</div>
        </div>
      </div>
      {connected && (
             <div style={{display:"flex",flexDirection:"column"}}>
               <a
                onClick={() => {
                  action.sendIncrement();
                }}
              >
                Increment
              </a>

              <a
                onClick={() => {
                  action.sendDeposite();
                }}
              >
                deposit
              </a>

              <a
                onClick={() => {
                  action.sendWithdraw();
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