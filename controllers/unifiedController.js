const gh = require('../github/github');

exports.reposCount = async (req, res) => {
  const count = await gh.totalRepos();
  res.status(200).json({
    message: 'ok',
    repos: count,
  });
};

exports.commitsCount = async (req, res) => {
  const count = await gh.totalCommits();
  res.status(200).json({
    message: 'ok',
    commits: count,
  });
};

exports.languages = async (req, res) => {
  const langs = await gh.getLanguages();
  res.status(200).json({
    message: 'ok',
    languages: langs,
  });
};

exports.achievements = async (req, res) => {
  const achievements = await gh.achievements();
  res.status(200).json({
    message: 'ok',
    languages: achievements,
  });
};
