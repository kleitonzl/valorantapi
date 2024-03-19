document.addEventListener('DOMContentLoaded', async function () {
    const weaponsList = document.getElementById('weaponsList');

    try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();

        data.data.forEach(weapon => {
            const weaponItem = document.createElement('div');
            weaponItem.classList.add('weaponItem');

            const weaponInfo = document.createElement('div');
            weaponInfo.classList.add('weaponInfo');
            weaponInfo.innerHTML = `
                <h3>${weapon.displayName}</h3>
                <p class="categoria" style="display:none;">categoria: ${weapon.shopData.category}</p>
                <p class="custo" style="display:none;">Custo: ${weapon.shopData.cost}</p>
                <p class="statisticas" style="display:none;">Taxa de fogo: ${weapon.weaponStats.fireRate }</p>
            `;

            weaponItem.appendChild(weaponInfo);

            
            const weaponImage = document.createElement('img');
            weaponImage.id = `weapon-${weapon.uuid}`;
            weaponImage.src = weapon.displayIcon;
            weaponImage.alt = 'Imagem da arma';

            let clickCount = 0; 

            weaponImage.addEventListener('click', function () {
                clickCount++; 

                
                const categoria = weaponInfo.querySelector('.categoria');
                const statisticas = weaponInfo.querySelector('.statisticas');
                const custo = weaponInfo.querySelector('.custo');
                if (clickCount % 2 === 0) {
                    categoria.style.display = 'none';
                    statisticas.style.display = 'none';
                    custo.style.display = 'none';
                } else {
                    categoria.style.display = 'block';
                    statisticas.style.display = 'block';
                    custo.style.display = 'block';
                }
            });

            weaponItem.appendChild(weaponImage);

            weaponsList.appendChild(weaponItem);
        });
    } catch (error) {
        console.error('Erro ao obter dados das armas:', error);
    }
});
