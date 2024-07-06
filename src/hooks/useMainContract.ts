import { useEffect, useState } from "react";
import { MainContract } from "../contract/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInisialize";
import { Address, OpenedContract, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
  const {sender} = useTonConnect();
  const sleep = (time:number)=>{
    new Promise((resolve)=>setTimeout(resolve, time))
  }
  const client = useTonClient();
  const [contractData, setContractData] = useState<null | {
    counter_value: number,
    recent_sender: Address,
    owner_address: Address,
  }>(null);
  const [balance,setBalance] = useState<number|null>(0);
  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQDkv_zv38gu_-ekZjI-0XT3rir0GVDjQ7NxJr4Ntl-szFuG") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const val = await mainContract.getData();
      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
      });

      const blc = await mainContract.getBalance();
      setBalance(blc.balance);
      await sleep(5000)
    }
    getValue();
  }, [mainContract]);
  console.log("counter value is : ",contractData);
  
  return {
    contract_address: mainContract?.address.toString(),
    contract_balance:balance,
    ...contractData,
    sendIncrement:async()=>{
      return mainContract?.sendInternalMessage(sender,toNano("0.05"),6)
    },
    sendDeposite:async()=>{
      return mainContract?.sendDeposit(sender,toNano("1"))
    },
    sendWithdraw:async()=>{
      return mainContract?.sendWithdrawalRequest(sender,toNano("0.05"),toNano("0.7"))
    }
  };
}