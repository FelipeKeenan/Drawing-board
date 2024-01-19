//Inicial Data
let currentColor = 'black' //cor atual
let screen = document.querySelector('#tela')
let context = screen.getContext('2d')
let canDraw = false; //Variável que quis se pode desenhar ou não

    // Posição inicial do mouse
 let mouseX = 0 
 let mouseY = 0






//Actions:
    //Mudança de cores e pegando cada cor que eu clicar:
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', changeColor)
})

    //Adicionando eventos de click na tela quando for desenhar
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)


    //Adicionando o evento de reset da tela
document.querySelector('.clear').addEventListener('click', clearScreen)





//Funções:

    //Mudando as cores do pincel
function changeColor(event){
    let color = event.target.getAttribute('data-color') //O "data-color" vai pegar cada elemento único do data-color.
    currentColor = color //Cor atual vai receber a que eu clicar

        //Alterando a classe da cor atual
    document.querySelector('.color.active').classList.remove('active') //Retirando a classe "active" do elemtento que a possui.
    event.target.classList.add('active') //Adiciono a classe "active" na cor que eu cliquei.
}

function mouseDownEvent(e){
    canDraw = true; //Pode desenhar
    
    //Achando a real posição do mouse dentro do canvas, levando em consideração que ele pega a tela toda.
    mouseX = e.pageX - screen.offsetLeft //A variável "pointX" vai nos dizer aonde está o mouse no eixo X.  "offsetLeft" vai nos dizer qual é a distância do elemento para o canto esquerdo da página
    mouseY = e.pageY - screen.offsetTop
    screen.classList.add('drawing')


}



function mouseMoveEvent(e){
    if (canDraw){ //Se o estiver movendo o mouse com o click segurando, estarei desenhando.
        draw(e.pageX, e.pageY) //Passo dois parâmetros: a posição do mouse no eixo X e a do eixo Y.
    }
    }
    
    


function mouseUpEvent(){
    canDraw = false
    screen.classList.remove('drawing')
}


    //Função do desenho em si
function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // Estruturando as linhas:
    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen(){
    fadeOut()
}



function fadeOut() {
    let opacity = 1;
    function animate() {
        opacity -= 0.05; 
        context.clearRect(0, 0, screen.width, screen.height);
        context.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        context.fillRect(0, 0, screen.width, screen.height);

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            // Limpar totalmente o canvas quando a animação estiver completa
            context.clearRect(0, 0, screen.width, screen.height);
        }
    }
    animate();
}