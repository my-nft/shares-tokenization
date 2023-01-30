let cmtat_instace_read
let cmtat_instace_write
let chain // = await web3.eth.getChainId();
async function onStart() {
	initWeb3Provider().then(async (value) => {
		cmtat_instace_read = await new web3Infura.eth.Contract(
			cmtat_abi,
			CMTAT_addres
		);
		cmtat_instace_write = await new web3.eth.Contract(
			cmtat_abi,
			CMTAT_addres
		);

		chain = await web3.eth.getChainId();

		let name = await cmtat_instace_read.methods.name().call();

		console.log("cmtat_instace_read: ", cmtat_instace_read)
		console.log("name: ", name)
		// update()
		try{updateTotalSupply()}catch(e){console.log(e)}
		try{updateCirculatingSupply()}catch(e){console.log(e)}
		try{updateTotalHolders()}catch(e){console.log(e)}
		try{updateTotalSupplyLastSnapshot()}catch(e){console.log(e)}
	});
}

onStart()

async function updateTotalSupply(){
	var totalSupply = await cmtat_instace_read.methods.totalSupply().call();
	console.log("total supply: ", totalSupply)

  document.querySelector("#total-supply").innerText = totalSupply;
}

async function updateTotalSupplyLastSnapshot(){
	var allSnapshots = await cmtat_instace_read.methods.getAllSnapshots().call();
	var lastSnapshotId = allSnapshots.length
	var lastSnapshot = allSnapshots[lastSnapshotId-1]
	var totalSupplyLastSnapshot = await cmtat_instace_read.methods.snapshotTotalSupply(lastSnapshot).call();
  document.querySelector("#snapshot-total-supply").innerText = totalSupplyLastSnapshot;
}

async function updateCirculatingSupply(){
	circulatingSupply = 0
  document.querySelector("#circulating-supply").innerText = circulatingSupply;
}

async function updateTotalHolders(){
	totalHolders = 1
  document.querySelector("#total-holders").innerText = totalHolders;
}
