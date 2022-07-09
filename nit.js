const {exec} = require("child_process");
const {promisify} = require("util");

const head = '7934d167504db1230360cb7ba75563aea3780229';
const exec_promise = promisify(exec);

async function readGitCat(head1) {
  var {stdout} =  await exec_promise(`git cat-file -p ${head1}`)
  let [tree, ...tail] = stdout.split("\n");
  let [,hash] = tree.split(" ");
  console.log({tree, tail, hash,})
  readGitCat(hash);
}

readGitCat(head)