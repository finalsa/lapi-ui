export const API_URL = getApiUrl();

export const LIGTH_COLOR = "light"

export const DARK_COLOR = ""

export const LOGO = `${process.env.PUBLIC_URL}/logo.png`

function getApiUrl() {
    let url = process.env.REACT_APP_API_URL;
    return (url) ? url : 'http://localhost:8000'
}

export const colors = ["#3298dc","#ff470f", "#ffdd57", "#48c774", "#00d1b2",  "#3273dc", "#b86bff", "	#f14668"]
