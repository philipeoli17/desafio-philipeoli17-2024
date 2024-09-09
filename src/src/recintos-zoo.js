class RecintosZoo {
    constructor() {
        
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExisten: ['macaco', 'macaco', 'macaco'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExisten: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExisten: ['gazela'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExisten: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExisten: ['leão'] }
        ];

        
        this.animaisHabilitados = [
            { especie: 'leão', tamanho: 3, bioma: 'savana' },
            { especie: 'leopardo', tamanho: 2, bioma: 'savana' },
            { especie: 'crocodilo', tamanho: 3, bioma: 'rio' },
            { especie: 'macaco', tamanho: 1, bioma: ['savana', 'floresta'] },
            { especie: 'gazela', tamanho: 2, bioma: 'savana' },
            { especie: 'hipopótamo', tamanho: 4, bioma: ['savana', 'rio'] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        
        const animalInfo = this.animaisHabilitados.find(a => a.especie.toLowerCase() === animal.toLowerCase());
        if (!animalInfo) {
            return { erro: "Animal inválido" };
        }

        
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        
        const recintosViaveis = this.recintos.filter(recinto => {
            
            if (!animalInfo.bioma.includes(recinto.bioma)) {
                return false;
            }

            
            const animaisAtuais = recinto.animaisExisten.map(a => this.animaisHabilitados.find(animal => animal.especie === a));
            const espacoOcupado = animaisAtuais.reduce((total, a) => total + a.tamanho, 0);

            
            const espacoLivre = recinto.tamanhoTotal - (espacoOcupado + quantidade * animalInfo.tamanho);

            
            if (espacoLivre >= 0) {
                return true;
            }
            return false;
        }).map(recinto => {
            
            const animaisAtuais = recinto.animaisExisten.map(a => this.animaisHabilitados.find(animal => animal.especie === a).tamanho);
            const espacoOcupado = animaisAtuais.reduce((total, tamanho) => total + tamanho, 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        });

        
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        
        return { recintosViaveis };
    }
}

// Exporta a classe para utilização externa
export { RecintosZoo as RecintosZoo};
