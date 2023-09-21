const cheerio = require('cheerio');
const axios = require('axios').default;

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GHACCESSTOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

const user = {};

exports.init = async () => {
  const _user = (await github.get('/user')).data;

  user.name = _user.name;
  user.username = _user.login;
  user.avatar_url = _user.avatar_url;
  user.html_url = _user.html_url;
  user.url = _user.url;
};

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

exports.achievements = async () => {
  const html = (await github.get(`https://github.com/${user.username}?tab=achievements`)).data;

  const achievements = [];
  const $ = cheerio.load(html);
  $('details.js-achievement-card-details').each((i, el) => {
    achievements.push({
      achievement: $(el).find('img').attr('alt').replace('Achievement: ', '').trim(),
      img_url: $(el).find('img').attr('src'),
      count: $(el).find('span').text().replace('x', '') * 1 || 1,
    });
  });
  // console.log(achievements);
  return achievements;
};
