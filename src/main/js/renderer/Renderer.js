import rendererCSS from '../../css/renderer.css';
import ko from '../../../../node_modules/knockout/build/output/knockout-latest.debug.js';
import $ from '../../../../node_modules/jquery/dist/jquery.js';
import rendererTemplate from '../../html/renderer.tmpl.html';
import DataService from '../service/DataService.js';
import Product from '../model/Product.js';

export class Renderer {

	constructor({label = 'Search'}, elm){
        let self = this;

        //store the Data service, to get the actual data
        this.service = DataService.getInstance();

        //list of all products
        this.allProducts = ko.observableArray([]);

        //for storing current search text
        this.searchText = ko.observable('');

        this.label = ko.observable(label);

        //list of all recent searches
        this.recentSearchArray = ko.observableArray([]);

        //adding debounce , so that we dont do frequent search
        this.searchTextDebounced =
            ko.pureComputed(this.searchText).extend({
                rateLimit: { method: "notifyWhenChangesStop", timeout: 400 }
            });

        //subscribe to the search text change
        this.searchTextDebouncedSunscription =
            this.searchTextDebounced.subscribe(function (val) {
                self.performDebouncedSearch();
            });

        //for storing list of suggestions
        this.suggesstionList= ko.observableArray([]);

        //create the product list
        this.populateProductList();

        //set events for opening opopup
        this.setupEvents ();

        //binding functions to this
        this.selectProduct = this.selectProduct.bind(this);
        this.openDropDown = this.openDropDown.bind(this);
        this.selectRecentProduct = this.selectRecentProduct.bind(this);
	}

    /**
     * labels for Types
     * @param type
     * @returns {*}
     */
     typeMap(type) {
        let map = {
            CREDIT_CARD : 'Credit Card',
            INVESTMENT : 'Investment',
            BANK : 'Bank',
            LOAN : 'Loan',
            MORTGAGE : 'Mortgage'
        };

        return map[type];
    }

    /**
     * to hide dropdown when user clicks anywhere else
     */
	setupEvents () {
        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropdown-content')) {

                $('#dropdown-content').hide();
            }
        }
    }

    /**
     * to create the list of products
     */
	populateProductList(){
	    let self =this;
	    this.service.getProducts().then(function (products) {
            let _products = [];
            products.forEach(function(item){
                let product= new Product(item);
                _products.push(product);
            });

            self.allProducts(_products);
        }).catch(function () {

        });
    }

    /**
     * to perform the search for typed key
     */
    performDebouncedSearch(){

        let filter = this.searchText().toString();
        let filterLen = filter.length;

        if(filterLen ===0){
            return;
        }

        //all products
        const _products = this.allProducts();

        // products grouped based on Type
        let productTypeList = {};

        for(let i =0 ; i< _products.length;i++){
            let item = _products[i];

            let matchIndex= item.name.toLowerCase().indexOf(filter.toLowerCase());
            if( matchIndex>-1){
                let text = item.name.substr(0,matchIndex) +
                    '<b>' + item.name.substr(matchIndex,filterLen) +
                    '</b>' + item.name.substr(matchIndex + filterLen);


                let prod = {
                    name: text,
                    original : item.name,
                };

                if(!productTypeList.hasOwnProperty(item.type)){
                    productTypeList[item.type] = {items : []};
                }
                productTypeList[item.type].items.push(prod);
            }

        }

        //final suggestions
        let _prunedList = [];
        for(let item in productTypeList){
            if(productTypeList.hasOwnProperty(item)){
                _prunedList.push({
                    key :  'Institutes of type <b>' +this.typeMap(item) + ' </b>',
                    items : productTypeList[item].items.slice(0 , Math.min(productTypeList[item].items.length,3))
                })
            }
        }

        this.suggesstionList(_prunedList);
    }


    /**
     * knockout click event listner , to open dropdown
     * @param data
     * @param event
     */
    openDropDown(data,event){
        let recentSearches = this.service.getRecentSearches();

        let _searches = new Set;

        for(let i=0 ; i < recentSearches.length;i++){
            _searches.add(recentSearches[i]);
            if(_searches.size === 5){
                break;
            }
        }

        this.recentSearchArray(Array.from(_searches));

        $('#dropdown-content').show();
        event.stopPropagation();
    }

    /**
     * knockout click event listner , to select a product
     * @param data
     * @param event
     */
    selectProduct(data,event){
        this._selectProduct(data.original);
    }

    /**
     * knockout click event listner , to select a reent product
     * @param data
     * @param event
     */
    selectRecentProduct(data,event){
        this._selectProduct(data);
    }

    /**
     * internal method to store a product
     * @param product
     * @private
     */
    _selectProduct(product){
        $('#dropdown-content').hide();
        this.searchText(product);
        this.service.addRecentSearches(product);
    }
}



ko.components.register('auto-search', {
	viewModel: {
		createViewModel: function(params, componentInfo) {
			return new Renderer(params, componentInfo.element);
		}
	},
	template: rendererTemplate
});