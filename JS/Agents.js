document.addEventListener('DOMContentLoaded', async function () {
    const agentList = document.getElementById('agentList'); 

    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();

        data.data.forEach(agent => {
            const agentItem = document.createElement('div');
            agentItem.classList.add('agentItem');

            const agentInfo = document.createElement('div');
            agentInfo.classList.add('agentInfo');

            
            
            agentInfo.innerHTML = `
                <h3>${agent.displayName}</h3>
                <img id="img-agents-${agent.uuid}" src="${agent.displayIcon}" alt="Imagem do agente">
                <p class="description" style="display:none;">Descrição: ${agent.description}</p>
                <p class="characteristics" style="display:none;">Características: ${agent.characterTags}</p>
                <p class="funcao" style="display:none;">Função: ${agent.role.displayName}</p>
            `;

            agentItem.appendChild(agentInfo);
            agentList.appendChild(agentItem);

            let clickCount = 0; // Contador de cliques

            // Adicionar ouvinte de evento de clique à imagem do agente
            const agentImage = agentInfo.querySelector(`#img-agents-${agent.uuid}`);
            agentImage.addEventListener('click', function () {
                clickCount++; // Incrementa o contador de cliques

                // Alterna a visibilidade das informações do agente
                const description = agentInfo.querySelector('.description');
                const characteristics = agentInfo.querySelector('.characteristics');
                const funcao = agentInfo.querySelector('.funcao');
                if (clickCount % 2 === 0) {
                    description.style.display = 'none';
                    characteristics.style.display = 'none';
                    funcao.style.display = 'none';
                } else {
                    description.style.display = 'block';
                    characteristics.style.display = 'block';
                    funcao.style.display = 'block';
                }
            });
        });
    } catch (error) {
        console.error('Erro ao obter dados dos agentes:', error);
    }
});