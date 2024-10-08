// Seleciona elementos HTML através do ID
const captureBtn = document.getElementById('captureBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');

// Função para acessar a câmera do usuário
navigator.mediaDevices.getUserMedia({ video: true }) // Pede permissão para acessar o vídeo da câmera
    .then(stream => {
        // Se o acesso for concedido, o fluxo de vídeo (stream) é atribuído à tag <video>
        video.srcObject = stream;
    })
    .catch(err => {
        // Se houver erro ao acessar a câmera, ele será mostrado no console
        console.error("Erro ao acessar a câmera: ", err);
    });

// Adiciona um listener no botão para capturar a imagem ao ser clicado
captureBtn.addEventListener('click', () => {
    // Obtém o contexto 2D do canvas, necessário para desenhar a imagem nele
    const context = canvas.getContext('2d');
    
    // Define a largura e a altura do canvas de acordo com o tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenha o vídeo atual no canvas (captura a imagem do vídeo)
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converte a imagem desenhada no canvas para uma URL de imagem (base64)
    const imageUrl = canvas.toDataURL('image/png');

    // Exibe a imagem capturada no elemento <img> (que estava oculto)
    photo.src = imageUrl;
    photo.style.display = 'block'; // Mostra a imagem no layout

    // Chama a função para baixar a imagem capturada
    downloadImage(imageUrl);
});

// Função para baixar a imagem capturada
function downloadImage(imageUrl) {
    // Cria um link temporário para simular o download
    const link = document.createElement('a');
    
    // Define a URL da imagem para ser baixada
    link.href = imageUrl;
    
    // Define o nome padrão para o arquivo baixado
    link.download = 'captura.png';

    // Adiciona o link ao corpo da página temporariamente
    document.body.appendChild(link);
    
    // Aciona o clique no link, iniciando o download da imagem
    link.click();
    
    // Remove o link da página após o clique, já que não é mais necessário
    document.body.removeChild(link);
}
