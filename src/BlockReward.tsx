import React, { useContext } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import TransactionValue from "./components/TransactionValue";
import FiatValue from "./components/FiatValue";
import { RuntimeContext } from "./useRuntime";
import { ExtendedBlock } from "./useErigonHooks";
import { useETHUSDOracle } from "./usePriceOracle";

type BlockRewardProps = {
  block: ExtendedBlock;
};

const BlockReward: React.FC<BlockRewardProps> = ({ block }) => {
  const { provider } = useContext(RuntimeContext);
  const eth2USDValue = useETHUSDOracle(provider, block.number);

  const netFeeReward = block?.feeReward ?? BigNumber.from(0);
  const value = eth2USDValue
    ? block.blockReward
        .add(netFeeReward)
        .mul(eth2USDValue)
        .div(10 ** 8)
    : undefined;

  return (
    <>
      <TransactionValue value={block.blockReward.add(netFeeReward)} />
      {!netFeeReward.isZero() && (
        <>
          {" "}
          (<TransactionValue value={block.blockReward} hideUnit /> +{" "}
          <TransactionValue value={netFeeReward} hideUnit />)
        </>
      )}
      {value && (
        <>
          {" "}
          <span className="px-2 border-amber-200 border rounded-lg bg-amber-100 text-amber-600">
            <FiatValue value={value} />
          </span>
        </>
      )}
    </>
  );
};

export default BlockReward;
