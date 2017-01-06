const fs = require("fs");
// const SDK = require("./dist/myloSDK.js");


try {
  fs.readdirSync("./tests")
    .forEach((test) => {
      require(`./tests/${test}`)(SDK)
        .then((bool) => {
          if (bool === true) {
            console.log(colors.green(`${test} test passed tests`));
          } else {
            console.log(colors.red(`${test} test failed with no errors`));
            process.exit(1);
          }
        })
        .catch((err) => {
          console.log(colors.red(`${test} test failed -- ${err} ${err.stack}`));
          process.exit(1);
        })
    })
} catch (err) {
  console.log(colors.red(`Test failed -- ${err} ${err.stack}`));
  process.exit(1);
}
