/*******************************************************
*
*
*******************************************************/

/* Customer class and constructor to create a customer object */
class Customer {
    constructor(row) { // takes in a row parameter (referenced to "tr" tag)
        this.row = row;
        this.rowIndex = row.rowIndex; // last selected index
        console.log("this row", this.row);
        for (let i=0; i<6; i++) {
            console.log("element", form.elements[i]);
            console.log("childNodes", row.childNodes[i]);
            form.elements[i].value = row.childNodes[i].innerHTML; // sets value to innerHTML corrsponding value
        }

        customer = this;
    }

    /* updates "customers" array with new values entered */
    replaceCustomer() {
        for (let i=0; i<6; i++) {
            customers[this.rowIndex-1][i] = form.elements[i].value;
        }

        fillTable();
        cancelCustomer();
    }

    /* removes row associated with current "customer" object */
    deleteCustomer() {
        table.deleteRow(this.rowIndex);
        customers.splice(this.rowIndex-1, 1);
        cancelCustomer();
    }
}