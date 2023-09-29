const axios = require('axios').default;
const { Worker, isMainThread } = require('worker_threads');

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GHACCESSTOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

module.exports.github = github;
// const user = {};

// exports.init = async () => {
//   const _user = (await github.get('/user')).data;

//   user.name = _user.name;
//   user.username = _user.login;
//   user.avatar_url = _user.avatar_url;
//   user.html_url = _user.html_url;
//   user.url = _user.url;
// };

exports.basicInfo = async () => {
  const _user = (await github.get('/user')).data;
  return {
    name: _user.name,
    username: _user.login,
    avatar_url: _user.avatar_url,
    html_url: _user.html_url,
  };
};

exports.totalRepos = async () => {
  const response = github.get('/user/repos');
  return (await response).data.length;
};

exports.totalCommits = async () => {
  if (isMainThread) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(`${__dirname}/../workers/commitsCounter.js`);

      worker.on('message', (commitsCount) => resolve(commitsCount));

      worker.on('error', (error) => reject(error));
    });
  }
};

exports.languages = async () => {
  const repos = (await github.get('/user/repos')).data;
  const langs = new Set();
  repos.forEach((repo) => {
    if (repo.language) langs.add(repo.language);
  });
  return [...langs];
};

exports.achievements = async () => {
  const username = (await github.get('/user')).data.login;
  const res = await github.get(`https://github.com/${username}?tab=achievements`);

  const html = res.data;

  if (isMainThread) {
    // In the main thread, create a worker to process the HTML
    return new Promise((resolve, reject) => {
      const worker = new Worker(`${__dirname}/../workers/achievementScraper`, { workerData: html });

      worker.on('message', (achievements) => {
        resolve(achievements);
      });

      worker.on('error', (err) => {
        reject(err);
      });

      worker.postMessage(html);
    });
  }
};
