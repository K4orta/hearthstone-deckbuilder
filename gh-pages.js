const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.join(__dirname, 'public'), (err) => {
  if (err !== undefined) {
    console.log(err);
    return;
  }
  console.log('Published to gh-pages branch');
});
