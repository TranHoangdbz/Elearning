export function formatVolume(d) {
    d = Number(d);
    var m = Math.floor(d % 3600 % 60);
    var h = (d - m) / 60

    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";

    return hDisplay + mDisplay;
}