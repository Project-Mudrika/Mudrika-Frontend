import { useState } from "react";
import TokenHelper from "../helpers/TokenHelper";

export default function addToken() {

    const tokenHelper = new TokenHelper();
    const [amount, setAmount] = useState(0);
    const [toAddress, setToAddress] = useState("");

    async function addMudrikaToken(e) {
        e.preventDefault();
        const tokenAddress = '0x6CF40C7AE3bad60cdF1e89F82417EdB6b54b9E0C';
        const tokenSymbol = 'MDK';
        const tokenDecimals = 18;
        const tokenImage = 'https://ndma.gov.in/sites/default/files/emblem-dark.png';

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchTokenBalance(e) {
        e.preventDefault();
        var mdk_balance = await tokenHelper.fetchBalance()
        alert(`Token Balance: ${mdk_balance} MDK`)
    }

    async function mintTokens(e) {
        e.preventDefault();
        await tokenHelper.mintTokens(toAddress, amount)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem' }}>

            {/* element 1 */}
            <button type="button" onClick={addMudrikaToken}>
                Add Mudrika Token
            </button>

            {/* element 2 */}
            <button type="button" onClick={fetchTokenBalance}>
                Fetch Mudrika Token Balance
            </button>

            {/* element 3 */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                <label>Amount</label>
                <input type="number" onChange={(e) => setAmount(e.target.value)} />
                <label>To Address</label>
                <input type="text" onChange={(e) => setToAddress(e.target.value)} />
                <button type="button" onClick={mintTokens}>
                    Mint Tokens to Address
                </button>
            </div>

        </div>


    );
}
