import React, { useEffect, useState } from "react";

export default function MetaConnect() {
    const [errorMessage, setErrorMessage] = useState('');
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", accountsChanged);
            window.ethereum.on("chainChanged", connectHandler);
        }
    }, []);

    const connectHandler = async () => {
        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                await accountsChanged(res[0]);
            } catch (err) {
                console.error(err);
                setErrorMessage("There was a problem connecting to MetaMask");
            }
        } else {
            setErrorMessage("Install MetaMask");
        }
    };

    const accountsChanged = async (newAccount: React.SetStateAction<null>) => {
        setAccount(newAccount);

        try {
            const currentChain = await window.ethereum.request({ method: 'eth_chainId' })
            setChainId(window.ethereum.networkVersion)
            console.log(currentChain)

        } catch (err) {
            console.error(err);
            setErrorMessage("There was a problem connecting to MetaMask");
        }
    };

    return (
        <div className={'flex flex-col justify-center items-center h-screen bg-blue-400'}>
            <div className={'p-12 rounded-lg bg-white'}>
                {account && <h1 className={'text-2xl'}>Account: {account}</h1>}
                {chainId && <p>Chain ID: {chainId}</p>}
                {!account && <button onClick={connectHandler}>Connect Account</button>}
                {errorMessage && `Error: ${errorMessage}` }
            </div>
        </div>
    )
};
