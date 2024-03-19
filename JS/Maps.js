document.addEventListener('DOMContentLoaded', async function () {
    const mapList = document.getElementById('mapList');
    const apiKey = 'AIzaSyB0T-Dhy-WMWlOEP34pp31ZFcQdwp45xt4';

   

    try {
        const response = await fetch('https://valorant-api.com/v1/maps');
        const data = await response.json();

        for (const map of data.data) {
            const mapItem = document.createElement('div');
            mapItem.classList.add('mapItem');

            const mapInfo = document.createElement('div');
            mapInfo.classList.add('mapInfo');

           
            const tacticalDescription = await translateText(map.tacticalDescription, 'en', 'pt');
           
            const narrativeDescription = await translateText(map.narrativeDescription, 'en', 'pt');

            mapInfo.innerHTML = `   
                <h3>${map.displayName}</h3>
                <img id="img-mapas" src="${map.splash}" alt="Imagem do mapa">
                <p class="description" style="display:none;">Descrição tática: ${tacticalDescription}</p>
                <p class="narrative" style="display:none;">Descrição: ${narrativeDescription}</p>
            `;

            mapItem.appendChild(mapInfo);
            mapList.appendChild(mapItem);

            let clickCount = 0;

           
            const mapImage = mapInfo.querySelector('#img-mapas');
            mapImage.addEventListener('click', function () {
                clickCount++; 

                
                const description = mapInfo.querySelector('.description');
                const narrative = mapInfo.querySelector('.narrative');
                if (clickCount % 2 === 0) {
                    description.style.display = 'none';
                    narrative.style.display = 'none';
                } else {
                    description.style.display = 'block';
                    narrative.style.display = 'block';
                }
            });
        }
    } catch (error) {
        console.error('Erro ao obter dados dos mapas:', error);
    }

    async function translateText(text, sourceLang, targetLang) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
            }),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return data.data.translations[0].translatedText;
    }
});
