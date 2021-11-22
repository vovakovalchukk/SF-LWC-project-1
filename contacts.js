import { LightningElement } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';

import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import MOBILE_PHONE from '@salesforce/schema/Contact.Phone';
import CREATED_DATE from '@salesforce/schema/Contact.CreatedDate';

import searchContacts from '@salesforce/apex/ContactController.searchContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: 'url', type: 'url', typeAttributes: { 
        label: { 
            fieldName: FIRST_NAME.fieldApiName 
        } 
    } },
    { label: 'Last Name', fieldName: LAST_NAME.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL.fieldApiName, type: 'email' },
    { label: 'Account Name', fieldName: ACCOUNT_NAME.fieldApiName, type: 'text' },
    { label: 'Mobule Phone', fieldName: MOBILE_PHONE.fieldApiName, type: 'phone' },
    { label: 'Created Date', fieldName: CREATED_DATE.fieldApiName, type: 'date', typeAttributes: {
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

    connectedCallback() {
        this.handleSearch();
    }

    handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}

    handleSearch() {
        searchContacts({ searchTerm: this.searchTerm })
            .then((result) => {
                this.contacts = JSON.parse(JSON.stringify(result));;
                if(this.contacts){
                    this.contacts.forEach(item => item['url'] = '/lightning/r/Contact/' + item['Id'] + '/view');
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