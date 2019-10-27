// ¿ ¡ ! ?

// una lista de colores de piel
const coloresPiel = [
  '#8783D1',
  '#B89685',
  '#FFB997',
  '#FBB7C0',
  '#B6244F'
];

const coloresOjos = [
  '#96adc8',
  '#e5d352',
  '#d9e76c',
  '#537d8d',
  '#482c3d'
];

const coloresNariz = [
  '#3c1518',
  '#69140e',
  '#a44200',
  '#d58936',
  '#fff94f'
];

const coloresBoca = [
  '#ffbe0b',
  '#fb5607',
  '#ff006e',
  '#8338ec',
  '#3a86ff'
];

let entrada;

function setup() {
  createP('Ingresar su nombre:');
  entrada = createInput('');
  entrada.input(convertirNombreACara);
  createCanvas(400, 400);
}

function convertirParteANumero(parte) {
  let numero = 0;
  for (let i = 0; i < parte.length; i++) {
    numero += parte.charCodeAt(i);
  }
  return numero;
}

let colorDePiel = '#FFF';
let colorLosOjos = '#FFF';
let colorLaNariz = '#FFF';
let colorLaBoca = '#FFF';

let ajusteDeOjoIzquierdo = 1;
let ajusteDeOjoDerecho = 1;
let ajusteDeNariz = 250;
let ajusteLaBoca = 25;

function convertirNombreACara() {
  const nombre = entrada.value();
  // convertir nombre....
  console.log(nombre);
  // 1. convert name to fixed length hash (md5)
  // 1. convertir el nombre a un tamano fijo de hash
  console.log(CryptoJS.MD5(nombre));
  const hash = CryptoJS.MD5(nombre).toString();
  console.log(hash);
  
  // 2. split the md5 string into 4 pieces
  // 2. dividir la cadena de md5 en cuatro partes
  const parteDePiel = hash.substring(0, 8);
  const numeroDePiel = convertirParteANumero(parteDePiel);
  colorDePiel = coloresPiel[numeroDePiel % coloresPiel.length]
  console.log(parteDePiel, numeroDePiel, colorDePiel);

  const parteLaNariz = hash.substring(16, 24);
  const numeroLaNariz = convertirParteANumero(parteLaNariz);
  colorLaNariz = coloresNariz[numeroLaNariz % coloresNariz.length];
  ajusteDeNariz = map(numeroLaNariz, 0, 700, 176, 280);
  console.log(parteLaNariz, numeroLaNariz, colorLaNariz);

  const parteLosOjos = hash.substring(8, 16);
  const numeroLosOjos = convertirParteANumero(parteLosOjos);
  colorLosOjos = coloresOjos[numeroLosOjos % coloresOjos.length];
  ajusteDeOjoIzquierdo = ((numeroLosOjos % 10) + 1) / 8;
  ajusteDeOjoDerecho = ((numeroLaNariz % 10) + 1) / 8;
  console.log(parteLosOjos, numeroLosOjos, colorLosOjos);

  const parteLaBoca = hash.substring(24);
  const numeroLaBoca = convertirParteANumero(parteLaBoca);
  colorLaBoca = coloresBoca[numeroLaBoca % coloresBoca.length];
  ajusteLaBoca = map(numeroLaBoca, 0, 700, 25, 100);
  console.log(parteLaBoca, numeroLaBoca, colorLaBoca);
}

// dibujar
function draw() {
  // establecer el color de fondo
  background(colorDePiel);
  
  fill(colorLosOjos);
  // ojo izquierdo
  ellipse(100, 100, 70 * ajusteDeOjoIzquierdo);
  // ojo derecho
  ellipse(275, 100, 70 * ajusteDeOjoDerecho);

  // de nariz
  fill(colorLaNariz);
  triangle(200, 175, 225, ajusteDeNariz, 200, ajusteDeNariz);

  // la boca
  fill(colorLaBoca);
  triangle(10 + ajusteLaBoca, 300, 175 + ajusteLaBoca, 300, 200, 350);
}
