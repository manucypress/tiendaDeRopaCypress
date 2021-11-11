//en este fichero vamos a crear nuestros CASOS DE PRUEBAS

describe('Search elements', ()=>{

    //cada vez que quiera ejecutar una prueba, antes me hace esto
    beforeEach(()=>{  
        cy.visit('/'); //la / significa que siempre va a tomar como sitio base el valor de la variable baseUrl
    })
    //PRIMER CASO: 
    it('search for elements with multiple result',()=>{
        //busca en fixture un archivo y traerse todos los eltos que tiene y una vez que lo traes
        //le damos un álias con el mismo nombre index
        cy.fixture('index').then((index)=>{    
            cy.get(index.searchBox).type('dress');  //obtengo el elto caja de busqueda y escribo algo
            cy.get(index.searchButton).click();     //obtengo el elto botón y lo pulso
        })
        //busco y me traigo de fixture el fichero con los eltos de los resultados de la búsqueda y lo recupero (igual que antes)
        cy.fixture('searchResults').then((searchResult)=>{
            cy.get(searchResult.title).should('contain','dress');  //texto debe contener la palabra 'dress'
        })
    })
    //SEGUNDO CASO:
    it('search for elements with no results',()=>{
        //hacemos lo mismo que arriba, pero buscando algo que no nos va a devolver resultados.
        cy.fixture('index').then((index)=>{
            cy.get(index.searchBox).type('qwerty');
            cy.get(index.searchButton).click();
        })
        cy.fixture('searchResults').then((searchResult)=>{
            cy.get(searchResult.alert).should('contain','No results were found for your search'); 
        })
    })

})