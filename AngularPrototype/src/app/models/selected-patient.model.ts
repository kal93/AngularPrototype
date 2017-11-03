/// <summary>
/// This class is used to hold selected patient Ids and last activity days 
/// It will be used in the result page and not mapped to any model from WebAPI
/// </summary>
export class SelectedPatientModel {
    PatientIDs: string[];
    LastActivityDays: string;
}