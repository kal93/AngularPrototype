/// <summary>
/// This class provides settings of Patient List gird
/// Its used to pass input from Search component to PatientList component
/// </summary>
export class PatientListModel {
    //Flag to show/hide the Patient List grid, Show Results button
    public isPatientListShow?: boolean;
    //Row data of Patient List data
    public gridRowData?: any;
    //Display default error message and no data found message
    //Default Error message => Perform a search to view patient list
    //No data found message => No patients found that match the specified criteria. Enter a new search value
    public errorMessage?: string;

    //Store selected row from patient list
    public selectedRow?: any;
}