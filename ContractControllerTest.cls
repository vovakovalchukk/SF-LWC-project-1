@isTest
private class ContractControllerTest {

    @testSetup static void setup() {
        // Create common test accounts
        List<Contact> testCons = new List<Contact>();
        for(Integer i = 0; i < 2; i++) {
            Contact c = new Contact(
                FirstName = 'FirstName' + i,
                LastName = 'LastName' + i
            );
            testCons.add(c);
        }
        insert testCons;
    }

    @isTest static void testGetContactsWitnNameFilter() {
       
        List<Contact> testCons = new List<Contact>();
        testCons = ContactController.searchContacts('First');
        System.assertEquals(2, testCons.size());
    }

    @isTest static void testGetContactsWitnEmptyNameFilter() {
       
        List<Contact> testCons = new List<Contact>();
        testCons = ContactController.searchContacts('');
        System.assertEquals(2, testCons.size());
    }
}
