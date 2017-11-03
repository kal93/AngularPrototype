/// <summary>
/// This class is used to hold Test Results details
/// Used in Result Component
/// Its mapped to TestResultsModel from WebAPI
/// </summary>

export class TestResultsModel {
    TestName: string;
    Units: string;
    Range: string;
    Callback: string;
    ResultData: string;
    ResultedTechCode: string;
    ResultedTime: string;
    ExternalQA: string;
}