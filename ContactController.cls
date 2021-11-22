public with sharing class ContactController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getAllContacts() {
        return [
            SELECT AccountId, Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        
        // Return all contacts when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllContacts();
        }

        searchTerm = '%' + searchTerm + '%';

        return [
            SELECT AccountId, Id, FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate
            FROM Contact
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            LIMIT 50
        ];
    }
}
