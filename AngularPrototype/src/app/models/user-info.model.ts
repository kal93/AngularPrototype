/// <summary>
/// This class is used to hold User Settings
/// Used in Search Component to this model to get PatientList
/// Its mapped to UserModel from WebAPI
/// </summary>
export class UserInfoModel {
    UserId: number;
    Name: string;
    UserName: string;
    UserDescription: string;
    HostSystem: string;
    HostRole: string;
    Permissions: string;
    Password: string;
}                                         
