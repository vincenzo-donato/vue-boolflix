// AZIONE: Inizializzo il js per applicare Vue js e Axios 
let app = new Vue({

    // AZIONE: Assegno l'id 
	el: '#Container-generale',
    //FINE AZIONE: Assegno l'id 

    // AZIONE: Inizializzo le variabili 
	data: {
        allFilmSerie:[],
		generi: ['All'],
		visualizza: 'All',
        myApi: 'c72b21d0080f613f0bc2f4157d7d8911',
        sceltaFilm:'',
        myClass: 'hide',
        search: 'close',
        impostazioni: 'chiusa',
	},
    //FINE AZIONE: Inizializzo le variabili 

	// AZIONI: Azioni eseguite senza necessita di azionare un comando 
	mounted(){
        
        // AZIONE: Visualizzo la select per i film in base al genere 
        this.generi = ['All'];
        this.allFilmSerie = [];

        // AZIONE: Inizializzo con dati url che mi serviranno per le ricerche e filtri + aggiungo i parametri dei dati utent
        const filmPopolari = axios.get('https://api.themoviedb.org/3/movie/popular',{params:{ api_key: this.myApi, language: 'it-IT' }});
        const seriePopolari = axios.get('https://api.themoviedb.org/3/tv/popular',{params:{ api_key: this.myApi, language: 'it-IT' }});
        const filmGeneri = axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c72b21d0080f613f0bc2f4157d7d8911&language=it-IT');
        //FINE AZIONE: Inizializzo con dati url che mi serviranno per le ricerche e filtri + aggiungo i parametri dei dati utenti 
        
        // AZIONE: Inizio l'azione axios nel quale vado ad inserire tutti i risultati della mia ricerca in un'unica array + inserisco i generi  
        axios
            .all([filmPopolari, seriePopolari, filmGeneri])
            .then(axios.spread((movies, tv, generes) =>{
                this.allFilmSerie = this.allFilmSerie.concat(movies.data.results,tv.data.results);
                cast(this.allFilmSerie);
                stelle(this.allFilmSerie);
                this.generi = this.generi.concat(generes.data.genres);
                this.myClass = 'show';
            }))
        //FINE AZIONE: Inizio l'azione axios nel quale vado ad inserire tutti i risultati della mia ricerca in un'unica array + inserisco i generi  
	
    },
	//FINE AZIONI: Azioni eseguite senza necessita di azionare un comando 

	// AZIONI: Eseguite dopo un determinato comando (click/key/ecc)
	methods: {

        // AZIONE: Al click dell'input parte un comando che cerca e stampa tutti film e le serie tv presenti nella URL
        cerca(){

            // AZIONE: Visualizzo la select per i film in base al genere 
            this.myClass = 'show';
            this.generi = ['All'];
            this.allFilmSerie = [];

            // AZIONE: Inizializzo le var con i dati inseriti dall'utente per riutilizzarle a mio piacimento
            const params = {
                api_key : this.myApi,
                query : this.sceltaFilm,
                language : 'it-IT'
            }
            //FINE AZIONE: Inizializzo le var con i dati inseriti dall'utente per riutilizzarle a mio piacimento
            
            // AZIONE: Inizializzo con dati url che mi serviranno per le ricerche e filtri + aggiungo i parametri dei dati utent
            const filmMovie = axios.get('https://api.themoviedb.org/3/search/movie', {params:params});
            const filmtv = axios.get('https://api.themoviedb.org/3/search/tv', {params:params});
            const filmGeneri = axios.get('https://api.themoviedb.org/3/genre/movie/list',{params:{api_key: this.myApi, language: 'it-IT' }});
            //FINE AZIONE: Inizializzo con dati url che mi serviranno per le ricerche e filtri + aggiungo i parametri dei dati utenti 

            // AZIONE: Inizio l'azione axios nel quale vado ad inserire tutti i risultati della mia ricerca in un'unica array + inserisco i generi  
            axios
            .all([filmMovie, filmtv, filmGeneri])
            .then(axios.spread((movies, tv, generes) =>{
                this.allFilmSerie = this.allFilmSerie.concat(movies.data.results,tv.data.results);
                stelle(this.allFilmSerie);
                cast(this.allFilmSerie);
                this.generi = this.generi.concat(generes.data.genres);
            }))
            //FINE AZIONE: Inizio l'azione axios nel quale vado ad inserire tutti i risultati della mia ricerca in un'unica array + inserisco i generi  
        
        },
        // FINE AZIONE: Al click dell'input parte un comando che cerca e stampa tutti film e le serie tv presenti nella URL 

        // AZIONE: Svuota la mia array dei film e serie tv 
        svuota(){
            
            if(this.sceltaFilm == ''){
                this.allFilmSerie = [];
                this.generi = ['All'];
                this.myClass = 'hide';

                // AZIONE: Inizializzo con dati url che mi serviranno per le ricerche e filtri + aggiungo i parametri dei dati utent
                const filmPopolari = axios.get('https://api.themoviedb.org/3/movie/popular',{params:{ api_key: this.myApi, language: 'it-IT' }});
                const seriePopolari = axios.get('https://api.themoviedb.org/3/tv/popular',{params:{ api_key: this.myApi, language: 'it-IT' }});
                const filmGeneri = axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c72b21d0080f613f0bc2f4157d7d8911&language=it-IT');
                //FINE AZIONE: Inizializzo con dati url che mi serviranno per le ricerche e filtri + aggiungo i parametri dei dati utenti 
            
                // AZIONE: Inizio l'azione axios nel quale vado ad inserire tutti i risultati della mia ricerca in un'unica array + inserisco i generi  
                axios
                .all([filmPopolari, seriePopolari, filmGeneri])
                .then(axios.spread((movies, tv, generes) =>{
                    this.allFilmSerie = this.allFilmSerie.concat(movies.data.results,tv.data.results);
                    stelle(this.allFilmSerie);
                    cast(this.allFilmSerie);
                    this.generi = this.generi.concat(generes.data.genres);
                    this.myClass = 'show';
                }))
                //FINE AZIONE: Inizio l'azione axios nel quale vado ad inserire tutti i risultati della mia ricerca in un'unica array + inserisco i generi  
                }
        
        },
        //FINE AZIONE: Svuota la mia array dei film e serie tv 

        // AZIONE: Al click dell'input cambia la seguente var per visualizzare o meno l'input dove verra inserita la ricerca 
        open(){
            if(this.search == 'open'){
                this.search = 'close';
            }
            else{
                this.search = 'open'
            }
        },
        // FINE AZIONE: Al click dell'input cambia la seguente var per visualizzare o meno l'input dove verra inserita la ricerca 

        openService(){
            if(this.impostazioni == 'chiusa'){
                this.impostazioni = 'aperta'
            }
            else{
                this.impostazioni = 'chiusa'
            }
        }

	}
	//FINE AZIONI: Eseguite dopo un determinato comando (click/key/ecc)

});
//FINE AZIONE: Inizializzo il js per applicare Vue js e Axios 


// FUNZIONI: 

// FUNZIONE: Stelle 
function stelle(array){
    // NOTA: Lavoro sulla array e per ogni oggetto (vote_average) divido in due il numero e lo trasformo in un intero per visualizzare le stelle 
    array.forEach(element =>{
        element.vote_average = element.vote_average / 2;
        element.vote_average = Math.round(element.vote_average);
    })
};

// FUNZIONE: Cast 
function cast(arrayFilm){
    // NOTA: Lavoro sulla array e per ogni elemento aggiungo un nuovo valore array.(cast) 
    arrayFilm.forEach(oggetto =>{
        oggetto.cast = [];
        // NOTA: In seguito per ogni oggetto.id vado a fare una chiamata per estrapolare i nomi degli attori FILM
        axios
        .get('https://api.themoviedb.org/3/movie/' + oggetto.id + '/credits?api_key=c72b21d0080f613f0bc2f4157d7d8911&language= it-IT')
        .then((result) =>{
            // NOTA: Successivamente push per tre volte i nomi degli attori nella mia array.(cast) precedentemente creata 
            for(let i = 0; i < 3; i++){
                oggetto.cast.push(result.data.cast[i].name);
            }
        })
        // NOTA: In seguito per ogni oggetto.id vado a fare una chiamata per estrapolare i nomi degli attori SERIE-TV
        axios
        .get('https://api.themoviedb.org/3/tv/' + oggetto.id + '/credits?api_key=c72b21d0080f613f0bc2f4157d7d8911&language= it-IT')
        .then((result) =>{
            // NOTA: Successivamente push per tre volte i nomi degli attori nella mia array.(cast) precedentemente creata 
            for(let i = 0; i < 3; i++){
                oggetto.cast.push(result.data.cast[i].name);
            }
        })
        
    })
}
