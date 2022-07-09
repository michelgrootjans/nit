const {exec} = require("child_process");
const {promisify} = require("util");
const exec_promise = promisify(exec);

const commitSHA = '7934d167504db1230360cb7ba75563aea3780229';

async function readGitFile(sha) {
  const {stdout} = await exec_promise(`git cat-file -p ${sha}`)
  const [node] = stdout.split("\n");
  console.log("file", node)
}

async function readGitNode(sha) {
  const {stdout} = await exec_promise(`git cat-file -p ${sha}`)
  const [node] = stdout.split("\n");
  const [, hash] = node.split(" ");
  console.log("node", {node, hash,})
  readGitFile("a5aa2fb488a17fcbc5e4ff0d92a78f73a34a33a1")
}

async function readGitRoot(rootSha) {
  const {stdout} =  await exec_promise(`git cat-file -p ${rootSha}`)
  const [node] = stdout.split("\n");
  const [,sha] = node.split(" ");
  console.log("root", {node, sha,})
  readGitNode(sha);
}

readGitRoot(commitSHA)