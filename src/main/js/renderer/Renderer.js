import rendererCSS from '../../css/renderer.css';
import ko from '../../../../node_modules/knockout/build/output/knockout-latest.debug.js';
import $ from '../../../../node_modules/jquery/dist/jquery.js';
import rendererTemplate from '../../html/renderer.tmpl.html';
import DataService from '../service/DataService.js';
import Product from '../model/Product.js';

export class Renderer {

	constructor({frame = '', frameChangedEvent}, elm){
        var self = this;

        //store the Data service, to get the actual data
        this.service = DataService.getInstance();

        //list of all products
        this.allProducts = ko.observableArray([]);

        //for storing current search text
        this.searchText = ko.observable('');

        this.recentSearchArray = ko.observableArray([]);

        //adding debounce , so that we dont do frequent search
        this.searchTextDebounced =
            ko.pureComputed(this.searchText).extend({
                rateLimit: { method: "notifyWhenChangesStop", timeout: 100 }
            });

        //subscribe to the search text change
        this.searchTextDebouncedSunscription =
            this.searchTextDebounced.subscribe(function (val) {
                self.performDebouncedSearch();
            });

        this.productType = new Set();

        this.suggesstionList= ko.observableArray([]);

        this.populateProductList();
        this.setupEvents ();

        //binding external events
        this.selectProduct = this.selectProduct.bind(this);
        this.openDropDown = this.openDropDown.bind(this);
        this.selectRecentProduct = this.selectRecentProduct.bind(this);
	}

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


	setupEvents () {
        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropdown-content')) {

                $('#dropdown-content').hide();
            }
        }
    }

	populateProductList(){
	    let self =this;
	    this.service.getProducts().then(function (products) {
            let _products = [];
            products.forEach(function(item){
                let product= new Product(item);
                _products.push(product);
                //add in set for product Type
                self.productType.add(item.type);
            });

            self.allProducts(_products);
        }).catch(function () {

        });
    }

    performDebouncedSearch(){
	    let self = this;
        let filter = this.searchText().toString();
        let filterLen = filter.length;

        if(filterLen ===0){
            return;
        }

        const _products = this.allProducts();

        let _prunedList = [];

        let productTypeList = {

        }

        for(let i =0 ; i< _products.length;i++){
            let item = _products[i];

            let matchIndex= item.name.toLowerCase().indexOf(filter.toLowerCase());
            if( matchIndex>-1){
                let text = item.name.substr(0,matchIndex) +
                    '<b>' + item.name.substr(matchIndex,filterLen) +
                    '</b>' + item.name.substr(matchIndex + filterLen);
                    //+ ' in <i>' + self.typeMap(item.type) +'</i>';

                let prod = {
                    name: text,
                    original : item.name,
                    // type : self.typeMap(item.type)
                };

                if(!productTypeList.hasOwnProperty(item.type)){
                    productTypeList[item.type] = {items : []};
                }
                productTypeList[item.type].items.push(prod);
            }

        }

        for(let item in productTypeList){
            if(productTypeList.hasOwnProperty(item)){
                _prunedList.push({
                    key :  'Institutes of type <b>' +self.typeMap(item) + ' </b>',
                    items : productTypeList[item].items.slice(0 , Math.min(productTypeList[item].items.length,3))
                })
            }
        }

        this.suggesstionList(_prunedList);
    }

    //knocout event
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

    //knocout event
    selectProduct(data,event){
        this._selectProduct(data.original);
    }

    selectRecentProduct(data,event){
        this._selectProduct(data);
    }

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