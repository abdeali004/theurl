
function encodeText() {
    let value =  document.getElementById("decoded").value;
    // console.log(value)
    document.getElementById("encoded").value = encodeURIComponent(value);
}

function decodeText() {
    let value =  document.getElementById("encoded").value;
    // console.log(value)
    document.getElementById("decoded").value = decodeURIComponent(value);
}