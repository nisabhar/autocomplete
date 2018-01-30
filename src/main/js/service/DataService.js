// import products from '../../data/products.json';
import $ from '../../../../node_modules/jquery/dist/jquery.js';

/**
 * A signlton for Data store
 * @type {{getInstance}}
 */
var DataService = (function(){

    var instance ;

    function CreateInstance() {

        var _state = {
            allProducts : null
        };

        return {

           getProducts :  function (){
               let result = new Promise((resolve,reject) =>{
                   if (_state && _state.allProducts){
                       resolve(_state.allProducts);
                   }
                   else{
                       $.getJSON( "../src/main/data/products.json", function(data) {
                           _state.allProducts =data.products;
                           resolve(_state.allProducts);
                       }).fail(function() {
                               reject( "error" );
                       })
                   }
               });

              return result;
           },

            addRecentSearches : function (searchKey) {
                let recentSearches = localStorage.getItem('RECENT_SEARCHES');
                if(!recentSearches){
                    recentSearches = [searchKey];
                }else{
                    recentSearches = JSON.parse(recentSearches);
                    if(recentSearches.indexOf(searchKey)<0){
                        recentSearches.push(searchKey);
                    }
                }

                localStorage.setItem('RECENT_SEARCHES', JSON.stringify(recentSearches));
            },

            getRecentSearches : function (){
                let recentSearches = localStorage.getItem('RECENT_SEARCHES');
                if(recentSearches){
                    recentSearches = JSON.parse(recentSearches);
                }else{
                    recentSearches = [];
                }

                return recentSearches;
            },
        }

    }



    return {
        getInstance : function(){
            if(!instance){
                instance = new CreateInstance();
            }
            return instance;
        }
    }
})();

export default DataService;