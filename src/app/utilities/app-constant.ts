
export class AppConstant {
    public static get baseUrl(): string {       
        return "https://omproduction-admin-default-rtdb.firebaseio.com/"
     }
     
    public static USERNAME_KEY: string = 'AuthUsername';
    public static CONFIRMATION_TITLE = "Confirmation Message";
    public static CONFIRMATION_SAVE = "Do You want to save?";
    public static CONFIRMATION_UPDATE = "Do You want to update?";
    public static CONFIRMATION_DELETE = "Do You want to delete?";
    public static CONFIRMATION_PUBLISH = "Do you want to publish?";
    public static SAVED_SUCCESSFULLY_MSG = "Saved Successfully!!!";
    public static PUBLISHED_SUCCESSFULLY_MSG = "Published Successfully!!!";
    public static DELETED_SUCCESSFULLY_MSG = "Deleted Successfully!!!";
    public static ERROR_MSG = "Something has gone wrong!!!";
    public static TOTAL_RECORD_LIMIT = 10;
    public static CONFIRMATION_CHANGE = "Do You want to change?";
    public static UPDATED_SUCCESSFULLY_MSG = "Updated Sucessfully!!!";
    public static CATEGORY_IN_USE_MSG = "Can't be deleted as Category is already in Use!!!";
    public static COUNTRY_IN_USE_MSG = "Can't be deleted as Country is already in Use!!!";
    public static CLIENT_IN_USE_MSG = "Can't be deleted as Client is already in Use!!!";
    public static CONFIRM_SEARCH_AGAIN = "Do You want to search again?";
    public static ADDED_SUCCESSFULLY_MSG = "Added Successfully!!!";
    public static CONFIRMATION_NEW_COLLECTION = "Do You want to add more collections?";

    
}
