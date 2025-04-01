async function leerFichero(fichero) {
    try {
        const response = await fetch(fichero);
        if (!response.ok) {
            throw new Error('Error en la lectura del archivo');
        }
        const texto = await response.text(); 
        leerTxt(texto);
        console.log("Lectura correcta");
    } catch (error) {
        console.error("Error en la lectura", error);
    }
}

leerFichero('fichero.txt');

function leerTxt(texto){
    document.getElementById("demo").innerText = texto;
}