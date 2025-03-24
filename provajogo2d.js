const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let pontuação = 0;
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') || 0;

const teclasPressionadas = {
   KeyW: false,
   KeyS: false,
   KeyD: false,
   KeyA: false
};
document.addEventListener('keydown', (e) => {
   for (let tecla in teclasPressionadas) {
       if (teclasPressionadas.hasOwnProperty(e.code)) {
           teclasPressionadas[tecla] = false;
       }
   }
   if (teclasPressionadas.hasOwnProperty(e.code)) {
       teclasPressionadas[e.code] = true;
   }
});
const background = new Image();
background.src = 'sanguevasos.webp';

class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x;
       this.y = y;
       this.largura = largura;
       this.altura = altura;
      
   }

   desenhar (){
       ctx.fillStyle = 'white';
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
}


class Cobra extends Entidade {

   constructor(x, y, largura, altura) {
       super(x, y, largura, altura)
   }
   
   atualizar() {
       if (teclasPressionadas.KeyW) {
           this.y -= 7
       } else if (teclasPressionadas.KeyS) {
           this.y += 7
       } else if (teclasPressionadas.KeyA) {
           this.x -= 7
       } else if (teclasPressionadas.KeyD) {
           this.x += 7
       }
       this.verificarColisaoBorda();
       
   }

   verificarColisao(comida){
       if(
           this.x < comida.x + comida.largura &&
           this.x + this.largura > comida.x &&
           this.y < comida.y + comida.altura &&
           this.y + this.altura > comida.y
       ){ 
           this.#houveColisao(comida);
       }

    }

       verificarColisaoBorda() {
        if (
            this.x < 0 || 
            this.x + this.largura > canvas.width || 
            this.y < 0 || 
            this.y + this.altura > canvas.height
        ) {
           if(pontuação > pontuacaoMaxima) {
            pontuacaoMaxima = pontuação;
            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima);
        }
        alert(`Game Over! Pontuação: ${pontuação}\nPontuação Máxima: ${pontuacaoMaxima}`);
        document.location.reload();
        }        
    }

    #houveColisao(comida){
       comida.x = Math.random()*canvas.width-10
       comida.y = Math.random()*canvas.height-10
       pontuação++
   } 

}
class Comida extends Entidade {
   constructor() {
       super(Math.random()*canvas.width-10, Math.random()*canvas.height-10, 20, 20)
   }
   desenhar (){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

}
const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida()

function loop() {
   ctx.fillStyle = 'green';
   ctx.font = '24px Arial';
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   cobra.desenhar()
   cobra.atualizar()
   comida.desenhar()
   cobra.verificarColisao(comida)
   ctx.fillText(`Pontuação: ${pontuação}`, 10, 20);
   ctx.fillText(`Pontuação Máxima: ${pontuacaoMaxima}`, 10, 50);
   requestAnimationFrame(loop);
}
loop()
