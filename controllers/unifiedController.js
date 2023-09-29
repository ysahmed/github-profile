const gh = require('../github/github');

exports.basicInfo = async (req, res) => {
  const info = await gh.basicInfo();
  res.status(200).json({
    message: 'ok',
    data: info,
  });
};

exports.reposCount = async (req, res) => {
  const count = await gh.totalRepos();
  res.status(200).json({
    message: 'ok',
    data: count,
  });
};

exports.commitsCount = async (req, res) => {
  const count = await gh.totalCommits();
  res.status(200).json({
    message: 'ok',
    data: count,
  });
};

exports.languages = async (req, res) => {
  const langs = await gh.languages();
  res.status(200).json({
    message: 'ok',
    data: langs,
  });
};

exports.achievements = async (req, res) => {
  const achievements = await gh.achievements();
  res.status(200).json({
    message: 'ok',
    data: achievements,
  });
};
