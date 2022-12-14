async function main() {
  //get my signer
  const [signer] = await ethers.getSigners();

  //hard code the actions to take

  let actions = [24, 5, 21, 20, 10];

  //values of ether for payable functions
  let values = [0, 0, 0, 0, 0];

  //encoded data for function calls
  let datas = [];

  //expose functions from github link
  // let datas = [
  //*   approvalEncoded,
  //   borrowEncoded,
  //   bentoWithdrawEncoded,
  //   depositEncoded,
  //   colateralEncoded,
  // ];

  //cauldron address on mainnet
  const cauldronAddress = "0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4";

  // create the cauldron instance
  const cauldron = await ethers.getContractAt(
    "CauldronV2Flat",
    cauldronAddress
  );

  console.log("address", signer.address);
  console.log("masterContract", await cauldron.masterContract());
  console.log("bentoBox", await cauldron.bentoBox());

  // console.log("tokens", await cauldron.nonces(signer.address));
  // console.log("encoded approval: \n", await getApprovalEncode())

  //insert the encoded approval
  datas.push(await getApprovalEncoded());
  console.log("datas[0]: ", datas[0]);

  async function getApprovalEncoded() {
    const account = signer.address;
    const verifyingContract = await cauldron.bentoBox();
    const masterContract = await cauldron.masterContract();
    const nonce = 1;
    const chainId = 1;

    //following the typedData format
    //fields in here are optional
    const domain = {
      name: "BentoBox V1",
      chainId,
      verifyingContract,
    };
    // The named list of all type definitions
    const types = {
      SetMasterContractApproval: [
        { name: "warning", type: "string" },
        { name: "user", type: "address" },
        { name: "masterContract", type: "address" },
        { name: "approved", type: "bool" },
        { name: "nonce", type: "uint256" },
      ],
    };
    // The data to sign
    const value = {
      warning: "Give FULL access to funds in (and approved to) BentoBox?",
      user: account,
      masterContract,
      approved: true,
      nonce,
    };

    //declare signature
    let signature;

    //using ethers._signTypedData to sign the approval data
    try {
      signature = await signer._signTypedData(domain, types, value);
      console.log("Here we have a signature: \n", signature);
    } catch (e) {
      //ledger wallets error
      console.log("SIG ERR:", e.code);
      if (e.code === -32603) {
        return "ledger";
      }
      return false;
    }

    //from the signature, we need the r, s, and v values

    const parsedSignature = parseSignature(signature);
    console.log("parsed Signature: ", parsedSignature);

    //encode the function arguments and return
    return ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "bool", "uint8", "bytes32", "bytes32"],
      [
        account,
        masterContract,
        true,
        parsedSignature.v,
        parsedSignature.r,
        parsedSignature.s,
      ]
    );
  }
  //function to extract r, s and v values from the signature
  function parseSignature(signature) {
    const parsedSignature = signature.substring(2);
    var r = parsedSignature.substring(0, 64);
    var s = parsedSignature.substring(64, 128);
    var v = parsedSignature.substring(128, 130);

    //0x'ed the values in a way to arrayify the data
    return {
      r: "0x" + r,
      s: "0x" + s,
      v: parseInt(v, 16),
    };
  }

  async function getBorrowEncoded(amount) {
    const account = signer.address;

    return this.$ethers.utils.defaultAbiCoder.encode(
      ["int256", "address"],
      [amount, account]
    );
  }
  datas.push(await getBorrowEncoded(""));

  async function getBentoWithdrawEncoded(amount) {
    //MIM token
    const pairToken = 0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3;
    const account = signer.address;
    return this.$ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "int256", "int256"],
      [pairToken, account, amount, "0x0"]
    );
  }

  datas.push(await getBentoWithdrawEncoded(""));

  async function getDepositEncoded(amount) {
    //users address
    const account = signer.address;
    //asset usere is depositing as collateral- shibainu
    const assetToken = "";
    return this.$ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "int256", "int256"],
      [assetToken, account, amount, "0"]
    );
  }

  datas.push(await getDepositEncoded(""));

  async function getColateralEncoded() {
    const account = signer.address;
    return this.$ethers.utils.defaultAbiCoder.encode(
      ["int256", "address", "bool"],
      ["-2", account, false]
    );
  }

  datas.push(await getColateralEncoded())


console.log("actions", actions)
console.log("values", values)
console.log("datas", datas)


  //cauldron.cook(actions, values, datas)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
