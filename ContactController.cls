public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        
        searchTerm = '%' + searchTerm.trim() + '%';

        return [
            SELECT FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
            FROM Contact
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            LIMIT 50
        ];
    }
}
