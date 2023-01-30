// Chosen wallet provider given by the dialog window
let provider;
let web3;

// let infura = "https://sepolia.infura.io/v3/b6271a54103e430fbc6d2ec56ff98755"
let infura = "https://polygon-mumbai.infura.io/v3/9c7e70b4bf234955945ff87b8149926e"
let web3Infura = new Web3(infura);
let web3Modal;
let selectedAccount;

let gasPrice
let defaultGasPrice = 100000000000

/**
 * Setup the orchestra
 */
async function initWeb3Provider() {
  if (localStorage.getItem("isMetamask") == "true") {
    provider = window.ethereum;
  } else if (localStorage.getItem("isWalletConnect") == "true") {
    // console.log("relaod WalletConnectProvider web3");
    provider = new window.WalletConnectProvider.default({
      infuraId: "9c7e70b4bf234955945ff87b8149926e",
      bridge: "https://bridge.walletconnect.org",
      //key: "db71d62f67d43a6fbc6a7c33605934c319ab885ad0a900ff9a252c41c5dce063",
    });
    try {
      await provider.enable();
      //resolve(provider);
    } catch (e) {
      console.log("WalletConnect Restore rejected", e);
      disconnectWallet();
      window.location = "/";
    }
  } else {

    // Tell Web3modal what providers we have available.
    // Built-in web browser provider (only one can exist as a time)
    // like MetaMask, Brave or Opera is added automatically by Web3modal
    const providerOptions = {
      walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
          infuraId: "9c7e70b4bf234955945ff87b8149926e",
        },
      },
    };

    // Web3modal instance
    web3Modal = new window.Web3Modal.default({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    console.log("Opening a dialog", web3Modal);
    try {
      // console.log("web3Modal")
      provider = await web3Modal.connect();
    } catch (e) {

      if(window.location.pathname == "/admin"){
        window.location = '/'
      }
      return;
    }
    // Get a Web3 instance for the wallet
    // Save the provider Id to local storage & restore connection from there
    // store user approval ?
    // console.log("chosen provider is ");
    // console.log(provider);
    // console.log("================================================");
    if (provider.isMetaMask) {
      localStorage.setItem("isMetamask", "true");
    }
    if (provider.wc && provider.wc.protocol == "wc") {
      localStorage.setItem("isWalletConnect", "true");
    }
  }
  if (provider) {
    web3 = new Web3(provider);
    // console.log("Ive got my connection ");
    await fetchAccountData();
    return web3;
  } else {
    // console.log("Could not start Web3 instance", e);
    // window.location = '/'
    // console.log("window.location: ", window.location)
    return null;
  }
}

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {
  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  //document.querySelector("#network-name").textContent = chainId;

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  // console.log(chainId, "=chainId; Got accounts", accounts);
  selectedAccount = accounts[0];
  const addresses = document.querySelectorAll("#selected-account");
  addresses.forEach(function (items) {
    items.textContent =
      selectedAccount.substring(0, 3) +
      " ... " +
      selectedAccount.substr(selectedAccount.length - 3);
  });
}

/**
 * Connect wallet button pressed.
 */
async function connectWallet() {
  console.log("connectWalet")
  await disconnectWallet();
  let builtWeb3 = await initWeb3Provider();
  console.log("Web3 instance is", web3);
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("chainChanged", (networkId) => {
    fetchAccountData();
  });

  return builtWeb3;
}

/**
 * Disconnect wallet button pressed.
 */
async function disconnectWallet() {
  // console.log("disconnect web3Modal", web3Modal);
  localStorage.setItem("isMetamask", "false");
  localStorage.setItem("isWalletConnect", "false");

  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    await web3.currentProvider.close();
  }
  if(web3Modal){
    const clear = await web3Modal.clearCachedProvider();
  }
  selectedAccount = null;
  const addresses = document.querySelectorAll("#selected-account");
  addresses.forEach(function (items) {
    items.textContent = "connect wallet";
  });
  localStorage.clear();
  web3Modal = null;
  provider = null;
  web3 = null;
}

// async function onStart() {
//   initWeb3Provider().then(async (value) => {
//
//   });
// }

// onStart()

async function getGasPrice() {
  gasPrice = (await web3.eth.getGasPrice()) || defaultGasPrice;

}
