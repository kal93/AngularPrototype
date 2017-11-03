import { SelectedPatientModel } from './selected-patient.model';
/// <summary>
/// This class is used to hold selected patient Ids and last activity days (SelectedPatientModel)
/// It will be used in the result page and not mapped to any model from WebAPI
/// </summary>
export class SelectedPatientForResultModel {
    public selectedData: SelectedPatientModel;
}