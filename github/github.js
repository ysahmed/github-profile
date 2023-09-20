const axios = require('axios').default;

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GHACCESSTOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

exports.totalRepos = async () => {
  const response = github.get('/user/repos');
  return (await response).data.length;
};

async function getCommitCount(url) {
  try {
    const response = await github.get(url);
    return response.data.length;
  } catch (error) {
    console.log(error);
  }
}

exports.totalCommits = async () => {
  const repos = (await github.get('/user/repos')).data;
  // console.log(repos.length);
  const commitCounts = await Promise.all(
    repos.map((repo) => getCommitCount(repo.commits_url.replace('{/sha}', ''))),
  );
  // console.log(commitCounts);
  return commitCounts.reduce((acc, current) => acc + current, 0);
};

exports.getLanguages = async () => {
  const repos = (await github.get('/user/repos')).data;
  const langs = new Set();
  repos.forEach((repo) => {
    langs.add(repo.language);
  });
  langs.forEach((lang) => {
    if (!lang) langs.delete(lang);
  });
  return [...langs];
};
