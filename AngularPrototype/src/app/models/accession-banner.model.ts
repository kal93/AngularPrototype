import { TestResultsModel } from './test-result.model';
/// <summary>
/// This class is used to hold patient Demographic details, Accession details and test results details
/// Used in Result Component
/// Its mapped to AccessionBannerModel from WebAPI
/// </summary>
export class AccessionBannerModel {
    AkaName: string;
    BirthDateText: string;
    LastName: string;
    FirstName: string;
    Name: string;
    MedicalRecordNumber: string;
    SSN: string;
    Gender: string;
    NHS: string;
    PIDX: string;
    DateOfLastActivityText: string;
    MPI: string;
    HospitalCode: string;
    AccessionNumber: string;
    CollectDate: string;
    RecieveDate: string;
    OrderingPhysician: string;
    Pidx: string;
    SpecimenDetails: string;
    OrderAccountNo: string;
    OrderLocation: string;
    PatientConsent: string;
    TestResults: TestResultsModel[];
}