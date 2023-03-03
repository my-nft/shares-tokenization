let cmtat_instace_read
let cmtat_instace_write
let vesting_instace_read
let vesting_instace_write
let chain // = await web3.eth.getChainId();
async function onStart() {
	initWeb3Provider().then(async (value) => {
		cmtat_instace_read = await new web3Infura.eth.Contract(
			cmtat_abi,
			CMTAT_address
		);
		cmtat_instace_write = await new web3.eth.Contract(
			cmtat_abi,
			CMTAT_address
		);

		vesting_instace_read = await new web3Infura.eth.Contract(
			vesting_abi,
			vesting_address
		);
		vesting_instace_write = await new web3.eth.Contract(
			vesting_abi,
			vesting_address
		);

		chain = await web3.eth.getChainId();

		let name = await cmtat_instace_read.methods.name().call();

		// console.log("cmtat_instace_read: ", cmtat_instace_read)
		// console.log("name: ", name)
		// update()
		try{updateTotalSupply()}catch(e){console.log(e)}
		// try{updateCirculatingSupply()}catch(e){console.log(e)}
		try{updateTotalHolders()}catch(e){console.log(e)}
		try{updateTotalSupplyLastSnapshot()}catch(e){console.log(e)}
	});
}

onStart()

async function updateTotalSupply(){
	var decimals =  await cmtat_instace_read.methods.decimals().call();
	var totalSupply = await cmtat_instace_read.methods.totalSupply().call();
	// console.log("total supply: ", totalSupply)

  document.querySelector("#total-supply").innerText = totalSupply/(10**decimals);
}

async function updateTotalSupplyLastSnapshot(){
	var allSnapshots = await cmtat_instace_read.methods.getAllSnapshots().call();
	// console.log("allSnapshots: ", allSnapshots)
	// console.log("allSnapshots length: ", allSnapshots.length)
	var lastSnapshotId = allSnapshots.length
	if(allSnapshots.length > 0){
		var lastSnapshot = allSnapshots[lastSnapshotId-1]
		var lastSnapshot = allSnapshots[lastSnapshotId-1]
		var totalSupplyLastSnapshot = await cmtat_instace_read.methods.snapshotTotalSupply(lastSnapshot).call();
	}else{
		var totalSupplyLastSnapshot = await cmtat_instace_read.methods.totalSupply().call();
	}

	var decimals =  await cmtat_instace_read.methods.decimals().call();

  document.querySelector("#snapshot-total-supply").innerText = totalSupplyLastSnapshot/(10**decimals);
}
//
// async function updateCirculatingSupply(){
// 	circulatingSupply = 0
//   document.querySelector("#circulating-supply").innerText = circulatingSupply;
// }

async function updateTotalHolders(){
	totalHolders = await cmtat_instace_read.methods.totalHolders().call();
  document.querySelector("#total-holders").innerText = totalHolders;
}
