/**
 * Created by nisabhar on 1/28/18.
 */

export default class Product {

    constructor(product){
        this.name = product.name;
        let indexOfDash = product.name.indexOf('-');
        if( product.name.indexOf('-') > 0){
            this.name = product.name.substring(0,indexOfDash );
        }
        this.url = product.url;
        this.type = product.type;
    }
}