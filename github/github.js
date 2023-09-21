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
  const commitCounts = await Promise.all(
    repos.map((repo) => getCommitCount(repo.commits_url.replace('{/sha}', ''))),
  );

  return commitCounts.reduce((acc, current) => acc + current, 0);
};

exports.languages = async () => {
  const repos = (await github.get('/user/repos')).data;
  const langs = new Set();
  repos.forEach((repo) => {
    if (repo.language) langs.add(repo.language);
  });
  return [...langs];
};

function Achievement(achievement, imgUrl, tierText) {
  //! too many arguments. spread maybe
  const tierN = tierText.replace('x', '') * 1;

  function getTier() {
    switch (tierN) {
      case 2:
        return 'Bronze';
      case 3:
        return 'Silver';
      case 4:
        return 'Gold';
      default:
        return 'Default';
    }
  }

  function getColor() {
    switch (tierN) {
      case 2:
        return '#F9BFA7';
      case 3:
        return '#E1E4E4';
      case 4:
        return 'FAE57E';
      default:
        return null;
    }
  }

  this.achievement = achievement;
  this.img_url = imgUrl;
  this.tier_text = tierText;
  this.tier = getTier();
  this.color = getColor();
}

exports.achievements = async () => {
  const username = (await github.get('/user')).data.login;
  const res = await github.get(`https://github.com/${username}?tab=achievements`);

  const html = res.data;
  const achievements = [];
  const $ = cheerio.load(html);
  $('details.js-achievement-card-details').each((i, el) => {
    achievements.push(
      new Achievement(
        $(el).find('img').attr('alt').split(':')[1].trim(),
        $(el).find('img').attr('src'),
        $(el).find('span').text(),
      ),
    );
  });
  return achievements;
};
