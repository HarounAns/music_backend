// helpers
const _getUrls = (key, contents) => {
    const urls = [];

    // turns into: https://haroun-lofi.s3.amazonaws.com/2019-06-07_-_Chill_Gaming_-_David_Fesliyan.mp3
    for (let song of contents) {
        let url = "https://" + key + ".s3.amazonaws.com/" + song.Key;
        urls.push(url);
    }

    return urls;
} 

module.exports = {
    _getUrls
}