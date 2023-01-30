console.log("cmtat_instace_write: ", cmtat_instace_write)

// showModal("Transaction error", "error.message", "error");


async function executeSnapshot(){
  var snapshotTime = document.querySelector("#snapshot-time").value
  console.log("isNumeric(value): ", isNumeric(snapshotTime))
  var timeNow = Date.now();
  timeNow = timeNow/1000

  if(timeNow > snapshotTime ||  !isNumeric(snapshotTime)){
    window.alert("please enter a valid date")
  }
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_read.methods.scheduleSnapshot(snapshotTime)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)

  }catch(e){
    console.log("e: ", e)
  }

}


async function mintTo(){
  staking_instance2.methods
		.withdraw(0, hexAmount)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
		.catch(function (error) {
			showModal("Transaction error", error.message, "error");
		})
		.then(function (estimatedGas) {
			estimatedGas = parseInt(estimatedGas) * 1.05 *4;
			estimatedGas = parseInt(estimatedGas);
			parameter = {
				from: account,
				gas: web3.utils.toHex(estimatedGas),
				gasPrice: web3.utils.toHex(gasPrice),
			};
			staking_instance2.methods
				.withdraw(0, hexAmount)
				.send(parameter, (err, transactionHash) => {
					if (transactionHash) {
						$("body").append(
							'<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
            <p style="position: absolute; color: White; top: 50%; left: 45%;">\
            Withdraw ...\
            <img src="images/loader.gif">\
            </p>\
            </div>'
						);
					}
					tx_hash = transactionHash;
				})
				.on("confirmation", () => {})
				.then((newContractInstance) => {
					setTimeout(removeLoader, 2000);
					showModal(
						"Transaction confirmed",
						"Withdraw operation has been successful",
						"success"
					);
				})
				.catch(function (error) {
					setTimeout(removeLoader, 2000);
					showModal(
						"Transaction failed",
						"Withdraw operation has failed",
						"error"
					);
				});
		});
}
