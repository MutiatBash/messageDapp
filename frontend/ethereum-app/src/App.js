import logo from "./logo.svg";
import "./App.css";
import contractAbi from "./abi.json";
const { ethers } = require("ethers");

function App() {
	const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	// const provider = new ethers.BrowserProvider(window.ethereum);

	// const contract = new ethers.Contract(contractAddress, contractAbi, signer);

	async function getAccount() {
		await window.ethereum.request({ method: "eth_requestAccounts" });
	}

	async function setMessage() {
		if (typeof window.ethereum !== "undefined") {
			await getAccount();
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				contractAbi,
				signer
			);
			try {
				const message = await contract.setMessage();
				await message.wait();
				console.log("new message");
			} catch (err) {
				console.error(err);
			}
		}
	}
	async function getMessage() {
		if (typeof window.ethereum !== "undefined") {
			await getAccount();
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				contractAbi,
				signer
			);
			try {
				const message = await contract.getMessage();
				await message.wait();
				console.log("new message");
			} catch (err) {
				console.error(err);
			}
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={setMessage}>Change Message</button>
				<button onClick={getMessage}>View Message</button>
			</header>
		</div>
	);
}

export default App;
