import { LightningElement } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';

import searchContacts from '@salesforce/apex/ContactController.searchContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Account Name', fieldName: 'AccountLink', type: 'url', typeAttributes: { 
        label: { 
            fieldName: 'AccountName'
        } 
    } },
    { label: 'Mobule Phone', fieldName: 'MobilePhone', type: 'phone' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', typeAttributes: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    } }
];

export default class Contacts extends LightningElement {
    columns = COLUMNS;

    searchTerm = '';
    contacts;
    error;

    handleSearch() {
        this.searchTerm = this.template.querySelector('.slds-var-m-bottom_small').value;
        searchContacts({ searchTerm: this.searchTerm })
            .then((result) => {
                this.contacts = JSON.parse(JSON.stringify(result));
                if (this.contacts) {
                        this.contacts = this.contacts.map(function(item) {
                            return {
                                'FirstName' : item.FirstName,
                                'LastName' : item.LastName,
                                'Email' : item.Email,
                                'MobilePhone' : item.MobilePhone,
                                'AccountLink' : '/lightning/r/Account/' + item.Account.Id + '/view',
                                'AccountName' : item.Account.Name,
                                'CreatedDate' : item.CreatedDate,
                            }
                    });

                }
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });
    }

    get errors() {
        return (this.error) ?
            reduceErrors(this.error) : [];
    }
}