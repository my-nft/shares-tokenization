// console.log("cmtat_instace_write: ", cmtat_instace_write)

// showModal("Transaction error", "error.message", "error");

async function executeSnapshot(){
  var snapshotTime = document.querySelector("#snapshotDateTime")
  var currentEpoch = Date.parse(snapshotTime.value);
  var snapshotTime = parseInt(currentEpoch/1000);
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
    gasLimit = await cmtat_instace_write.methods.scheduleSnapshot(snapshotTime)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.scheduleSnapshot(snapshotTime)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        schedduling snapshot ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      console.log('went through')
      setTimeout(removeLoader, 2000);
      window.alert("Snapshot scheduled successful")
      // showModal(
      //   "Transaction confirmed",
      //   "Withdraw operation has been successful",
      //   "success"
      // );
    })
    .catch(function (error) {
      setTimeout(removeLoader, 2000);
      console.log("error: ", error)
      window.alert("Snapshot scheduled failed")

    });

  }catch(e){
    // console.log("e: ", e)
    window.alert(e.message);
  }

}

async function removeSnapshot(){
  var snapshotTime = document.querySelector("#removeSnapshotDateTime").value
  // var currentEpoch = Date.parse(snapshotTime.value);
  var snapshotTime = snapshotTime;
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
    gasLimit = await cmtat_instace_write.methods.unscheduleLastSnapshot(snapshotTime)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.unscheduleLastSnapshot(snapshotTime)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        removing snapshot ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("remove snapshot success")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    console.log("e: ", e);
    window.alert(e.message);
  }

}

async function transfer(){
  var to = document.querySelector("#to").value
  var amount = document.querySelector("#amount").value
  console.log("isNumeric(value): ", isNumeric(amount))

  if(!isNumeric(amount)){
    window.alert("please enter a valid amount and receiver address")
  }
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.transfer(to, amount)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.transfer(to, amount)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        transfering shares ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("share transferred successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e);
    window.alert(e.message);
  }

}

async function freeze(){
  var addressToFreeze = document.querySelector("#freeze-address").value
  var reason = document.querySelector("#freeze-reason").value

  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.freeze(addressToFreeze, reason)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.freeze(addressToFreeze, reason)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        freezing address ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("freeze address success")

    })
    .catch(function (error) {
      setTimeout(removeLoader, 2000);
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e)
    window.alert(e.message);
  }

}

async function unfreeze(){
  var addressToUnFreeze = document.querySelector("#unfreeze-address").value
  var reason = document.querySelector("#unfreeze-reason").value

  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.unfreeze(addressToUnFreeze, reason)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.unfreeze(addressToUnFreeze, reason)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        unfreezing address ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("unfreeze address success")

    })
    .catch(function (error) {
      setTimeout(removeLoader, 2000);
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e)
    window.alert(e.message);
  }

}

async function burn(){
  console.log("burning")
  var from = document.querySelector("#burn-from").value
  var amount = document.querySelector("#burn-amount").value
  console.log("isNumeric(value): ", isNumeric(amount))

  if(!isNumeric(amount)){
    window.alert("please enter a valid amount and from address")
  }
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.forceBurn(from, amount)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.forceBurn(from, amount)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        burning shares ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("share burned successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e)
    window.alert(e.message);
  }

}

async function mint(){
  console.log("minting")
  var from = document.querySelector("#mint-to").value
  var amount = document.querySelector("#mint-amount").value
  console.log("isNumeric(value): ", isNumeric(amount))

  if(!isNumeric(amount)){
    window.alert("please enter a valid amount and from address")
  }
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.mint(from, amount)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.mint(from, amount)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        burning shares ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("share minted successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e)
    window.alert(e.message);
  }

}

async function mintVesting(){
  // console.log("minting")
  var to = document.querySelector("#mint-to-vesting").value
  var amount = document.querySelector("#mint-amount-vesting").value
  var vestingEnd = document.querySelector("#time-vesting")
  // console.log("vesting duration: ", vestingEnd)
  vestingEnd = vestingEnd.value
  vestingEnd = Date.parse(vestingEnd);
  vestingEnd = parseInt(vestingEnd/1000);

  var timeNow = Date.now();
  timeNow = timeNow/1000

  var vestingDuration = vestingEnd - timeNow
  vestingDuration = parseInt(vestingDuration)

  // console.log("vesting duration: ", vestingDuration)

  var cliff = document.querySelector("#cliff")
  // console.log("cliff: ", cliff)
  cliff = cliff.value

  var vestingStartTime = document.querySelector("#vesting-start-time").value
  vestingStartTime = Date.parse(vestingStartTime);
  vestingStartTime = parseInt(vestingStartTime/1000);

  var vestingSlicePeriod = document.querySelector("#vesting-slice-period")
  // console.log("vestingSlicePeriod: ", vestingSlicePeriod)
  var vestingSlicePeriod = vestingSlicePeriod.value
  // console.log("vestingSlicePeriod: ", vestingSlicePeriod)
  var vestingRevocable = document.querySelector("#vesting-revocable").value
  // console.log("vesting duration: ", vestingDuration)
  // console.log("cliff: ", cliff)
  if(!isNumeric(amount)){
    window.alert("please enter a valid amount")
  }
  let gasLimit
  try{
    // console.log("vesting_instace_write:", vesting_instace_write)
    const acc = await web3.eth.getAccounts();

    // console.log("acc:", acc)

    let account = web3.utils.toChecksumAddress(acc[0]);
    // console.log("account:", account)
    vesting_instace_write = await new web3.eth.Contract(
			vesting_abi,
			vesting_address
		);
    var token = await vesting_instace_write.methods.getToken().call()
    // console.log("token: ", token)
    // console.log("vesting_instace_write:", vesting_instace_write)
    // console.log("to: ", to)
    // console.log("vestingStartTime: ", vestingStartTime)
    // console.log("cliff: ", cliff)
    // console.log("vestingDuration: ", vestingDuration)
    // console.log("vestingSlicePeriod: ", vestingSlicePeriod)
    // console.log("vestingRevocable: ", vestingRevocable)
    // console.log("amount: ", amount)

    gasLimit = await vesting_instace_write.methods.createVestingSchedule(
      to,
      vestingStartTime,
      cliff,
      vestingDuration,
      vestingSlicePeriod,
      vestingRevocable,
      amount
    )
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    vesting_instace_write.methods.createVestingSchedule(
      to,
      vestingStartTime,
      cliff,
      vestingDuration,
      vestingSlicePeriod,
      vestingRevocable,
      amount)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        creating vesting schedule ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("vesting created successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    console.log("e: ", e)
    window.alert(e.message);
  }

}

async function grantRole(){
  var address = document.querySelector('#role-to').value;//document.querySelector("currency2")

  var roles = document.querySelectorAll('input[name="role"]');//document.querySelector("currency2")
  // var roles = document.querySelector("currency")
  let role;
  console.log("roles: ", roles)
  console.log("roles value: ", roles.length)
  console.log("roles value: ", roles[0].value)
  console.log("roles value: ", roles[0].checked)
  console.log("roles value: ", roles[1].checked)
  console.log("roles value: ", roles[2].checked)
  console.log("roles value: ", roles[3].checked)
  console.log("roles value: ", roles[4].checked)

  if(roles[0].checked){
    role = ADMIN_ROLE;
  }else if(roles[1].checked){
    role = MINTER_ROLE;
  }else if(roles[2].checked){
    role = PAUSER_ROLE;
  }else if(roles[3].checked){
    role = SNAPSHOT_ROLE;
  }else if(roles[4].checked){
    role = ENFORCER_ROLE;
  }

  console.log("role: ", role)
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.grantRole(role, address)
    .estimateGas({
      from: account,
      gasPrice: web3.utils.toHex(gasPrice),
    })
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
        from: account,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
      }
    cmtat_instace_write.methods.grantRole(role, address)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        burning shares ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("role granted successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    console.log("e: ", e)
    window.alert(e.message);
  }

}

async function renounceRole(){
  var address = document.querySelector('#role-to').value;//document.querySelector("currency2")

  var roles = document.querySelectorAll('input[name="role"]');//document.querySelector("currency2")
  // var roles = document.querySelector("currency")
  let role;
  // console.log("roles: ", roles)
  // console.log("roles value: ", roles.length)
  // console.log("roles value: ", roles[0].value)
  // console.log("roles value: ", roles[0].checked)
  // console.log("roles value: ", roles[1].checked)
  // console.log("roles value: ", roles[2].checked)
  // console.log("roles value: ", roles[3].checked)
  // console.log("roles value: ", roles[4].checked)

  if(roles[0].checked){
    role = ADMIN_ROLE;
  }else if(roles[1].checked){
    role = MINTER_ROLE;
  }else if(roles[2].checked){
    role = PAUSER_ROLE;
  }else if(roles[3].checked){
    role = SNAPSHOT_ROLE;
  }else if(roles[4].checked){
    role = ENFORCER_ROLE;
  }

  console.log("role: ", role)
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.renounceRole(role, address)
    .estimateGas({
      from: account,
      gasPrice: web3.utils.toHex(gasPrice),
    })
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
        from: account,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
      }
    cmtat_instace_write.methods.renounceRole(role, address)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        burning shares ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("role removed successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    console.log("e: ", e)
    window.alert(e.message);
  }

}

async function approve(){
  var to = document.querySelector("#approve-to").value
  var amount = document.querySelector("#approve-amount").value
  console.log("isNumeric(value): ", isNumeric(amount))

  if(!isNumeric(amount)){
    window.alert("please enter a valid amount and receiver address")
  }
  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await cmtat_instace_write.methods.approve(to, amount)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    cmtat_instace_write.methods.approve(to, amount)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        approving operator ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("approve success")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e);
    window.alert(e.message);
  }

}

async function release(scheduleId){
  const acc = await web3.eth.getAccounts();
  console.log("acc: ", acc)
  let account = web3.utils.toChecksumAddress(acc[0]);
  console.log("account: ", account)


  var vestingSchedule = await vesting_instace_read.methods.computeVestingScheduleIdForAddressAndIndex(account,scheduleId).call();
  console.log("vestingSchedule: ", vestingSchedule)

  var scheduleDetails = await vesting_instace_read.methods.getVestingSchedule(vestingSchedule).call();
  console.log("scheduleDetails: ", scheduleDetails)

  if(scheduleDetails['revoked']){
    window.alert("This vesting schedule has been revoked, please contact admin")
    return
  }
  var pending = await vesting_instace_read.methods.computeReleasableAmount(vestingSchedule).call();
  console.log("pending: ", pending)
  let gasLimit
  try{
    gasLimit = await vesting_instace_write.methods.release(vestingSchedule, pending)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    vesting_instace_write.methods.release(vestingSchedule, pending)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        claiming shares ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("release success")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e);
    window.alert(e.message);
  }

}


async function revoke(scheduleId){
  const acc = await web3.eth.getAccounts();
  console.log("acc: ", acc)
  let account = web3.utils.toChecksumAddress(acc[0]);

  var vestingSchedule = await vesting_instace_read.methods.getVestingIdAtIndex(scheduleId).call();
  // var pending = await vesting_instace_read.methods.computeReleasableAmount(vestingSchedule).call();

  let gasLimit
  try{
    gasLimit = await vesting_instace_write.methods.revoke(vestingSchedule)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    vesting_instace_write.methods.revoke(vestingSchedule)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        revoke vesting ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("revoke vesting success")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e);
    window.alert(e.message);
  }

}


async function transferVestingRole(){
  console.log("transfer vesting")
  var to = document.querySelector("#transfer-vesting-role-to").value

  let gasLimit
  try{
    const acc = await web3.eth.getAccounts();

    let account = web3.utils.toChecksumAddress(acc[0]);
    gasLimit = await vesting_instace_write.methods.transferOwnership(to)
		.estimateGas({
			from: account,
			gasPrice: web3.utils.toHex(gasPrice),
		})
    console.log("gasLimit: ", gasLimit)
    estimatedGas = parseInt(gasLimit) * 1.5 ;
    let params = 	{
  			from: account,
  			gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(parseInt(estimatedGas)),
  		}
    vesting_instace_write.methods.transferOwnership(to)
    .send(params, (err, transactionHash) => {
      if (transactionHash) {
        $("body").append(
          '<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
        <p style="position: absolute; color: White; top: 50%; left: 45%;">\
        transfer vesting role ...\
        <img src="imgs/loader.gif">\
        </p>\
        </div>'
        );
      }
      tx_hash = transactionHash;
    })
    .on("confirmation", () => {})
    .then((newContractInstance) => {
      setTimeout(removeLoader, 2000);
      window.alert("role transfer successfully")

    })
    .catch(function (error) {
      console.log("error: ", error)

    });

  }catch(e){
    // console.log("e: ", e)
    window.alert(e.message);
  }

}
