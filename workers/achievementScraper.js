const { parentPort, workerData } = require('worker_threads');
const cheerio = require('cheerio');

class Achievement {
  constructor(achievement, imgUrl, tierText) {
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
}

parentPort.on('message', (html) => {
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
  parentPort.postMessage(achievements);
});
