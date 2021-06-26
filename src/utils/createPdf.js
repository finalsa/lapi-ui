export default function createPdf(window, document, id, name, callback) {

    let element = document.getElementById(`${id}`);
    let opt = {
        filename: `${name}.pdf`,
    };
    window.html2pdf(element, opt);

}