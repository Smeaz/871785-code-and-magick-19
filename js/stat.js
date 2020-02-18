'use strict';
//
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var OFFSET = 10;
var IDENT = 40;
var HISTO_HEIGHT = 150;
var HISTO_WIDTH = 40;
var HISTO_SPACE = 50;
//
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//
window.renderStatistics = function (ctx, names, times) {
  var renderCloud = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(CLOUD_X + OFFSET, CLOUD_Y + OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = 'white';
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };
  renderCloud();
  var displayText = function () {
    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + 25, CLOUD_Y + 25);
    ctx.fillText('Список результатов:', CLOUD_X + 25, CLOUD_Y + 45);
  };
  displayText();
  var renderColumns = function () {
    var space = 0;
    var saturation;
    var getMaxScore = function (scores) {
      var maxScore = null;
      for (var i = 0; i < scores.length; i++) {
        if (maxScore < scores[i]) {
          maxScore = Math.floor(scores[i]);
        }
      }
      return maxScore;
    };
    for (var i = 0; i < 4; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        saturation = getRandomInt(100) + '%';
        ctx.fillStyle = 'hsl(240,' + saturation + ', 50%)';
      }
      var currentHistoHeight = times[i] / (getMaxScore(times) / HISTO_HEIGHT);
      ctx.fillRect(CLOUD_X + IDENT + space, CLOUD_Y + CLOUD_HEIGHT - IDENT, HISTO_WIDTH, -currentHistoHeight);
      ctx.fillStyle = 'black';
      ctx.fillText(names[i], CLOUD_X + IDENT + space, CLOUD_Y + CLOUD_HEIGHT - 33);
      ctx.fillText(Math.floor(times[i]), CLOUD_X + IDENT + space, HISTO_HEIGHT - currentHistoHeight + 73);
      space += HISTO_SPACE + HISTO_WIDTH;
    }
  };
  renderColumns();
};
