









exports.typingTime = (response) => {
    var timeWait = (response.length * genRandomWhole(30, 50));
    setTimeout(() => {
        return;
      }, timeWait);
}


exports.genRandomWhole = (min, max) => {
    return Math.random() * (min - max) + min;
}