export default function createPdf(window, document, id, name, callback) {

    let element = document.getElementById(`${id}`);
    let opt = {
        margin: 0,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        filename: `${name}.pdf`,
    };
    window.html2pdf(element, opt);

}