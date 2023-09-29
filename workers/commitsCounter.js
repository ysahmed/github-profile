const { parentPort } = require('worker_threads');
const { github } = require('../github/github');

async function getCommitCount(url) {
  const response = await github.get(url);
  return response.data.length;
}

(async () => {
  const repos = (await github.get('/user/repos')).data;
  const commitCounts = await Promise.all(
    repos.map((repo) => getCommitCount(repo.commits_url.replace('{/sha}', ''))),
  );

  parentPort.postMessage(commitCounts.reduce((acc, current) => acc + current, 0));
})();
