export default function getExtenstion(fname) {
    return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}