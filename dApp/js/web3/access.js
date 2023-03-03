async function accessControl(){

  initWeb3Provider().then(async (value) => {
    try{
      const acc = await web3.eth.getAccounts();

      let account = web3.utils.toChecksumAddress(acc[0]);

      cmtat_instace_read = await new web3Infura.eth.Contract(
    		cmtat_abi,
    		CMTAT_address
    	);

      var admin = await testAllowance(cmtat_instace_read, ADMIN_ROLE, account);
      var minter = await testAllowance(cmtat_instace_read, MINTER_ROLE, account);
      var pauser = await testAllowance(cmtat_instace_read, PAUSER_ROLE, account);
      var snapshot = await testAllowance(cmtat_instace_read, SNAPSHOT_ROLE, account);
      var enforcer = await testAllowance(cmtat_instace_read, ENFORCER_ROLE, account);

      console.log("admin: ", admin)
      console.log("minter: ", minter)
      console.log("pauser: ", pauser)
      console.log("snapshot: ", snapshot)
      console.log("enforcer: ", enforcer)
      if(!(admin || minter || pauser || snapshot || enforcer)){
        window.location = "/user";
      }

    }catch(e){
      window.location = "/user";
    }
  })
}

async function testAllowance(cmtat_instace_read, role, account){
  return  await cmtat_instace_read.methods.hasRole(role, account).call();

}



// accessControl()
