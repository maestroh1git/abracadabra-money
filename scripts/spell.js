async function main() {
  let actions = [5];
  let values = [0];
  let data = [""];
  const cauldronInstance = await ethers.getContractFactory("Magician");

  const deployedCauldron = await cauldronInstance.deploy(
    "0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4"
  );

  await deployedCauldron.deployed();

  console.log("cauldron address", deployedCauldron.address);

//   console.log("Cauldron object", deployedCauldron);
  try {
    const cast = await deployedCauldron.cookIt(actions, values, data);
    const rece = await cast.wait();
    console.log("receipt", rece);
  } catch (err) {
    console.log("error occurerd", err);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
