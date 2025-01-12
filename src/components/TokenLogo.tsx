import React, { useContext } from "react";
import { useImage } from "react-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { tokenLogoURL } from "../url";
import { RuntimeContext } from "../useRuntime";
import { ChecksummedAddress } from "../types";

type TokenLogoProps = {
  chainId: number;
  address: ChecksummedAddress;
  name: string;
};

const TokenLogo: React.FC<TokenLogoProps> = ({ chainId, address, name }) => {
  const { config } = useContext(RuntimeContext);

  const srcList: string[] = [];
  if (config) {
    srcList.push(tokenLogoURL(config.assetsURLPrefix ?? "", chainId, address));
  }
  const { src, isLoading } = useImage({ srcList, useSuspense: false });

  return (
    <div className="flex items-center justify-center text-gray-400 w-5 h-5">
      {src && (
        <img className="max-w-full max-h-full" src={src} alt={`${name} logo`} />
      )}
      {!src && !isLoading && <FontAwesomeIcon icon={faCoins} size="1x" />}
    </div>
  );
};

export default React.memo(TokenLogo);
