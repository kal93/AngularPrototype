/// <summary>
/// This class is used to hold Host Information-List of Host Systems and Host Roles 
/// that user can login to application
/// </summary>

export class HostInfoModel {
    HostSystems: Array<HostSystem>;
    HostRoles: Array<HostRole>;
}

/// <summary>
/// This class is used to hold Host System Information
/// </summary>
export class HostSystem {
    Name: string;
}

/// <summary>
/// This class is used to hold Host Role Information
/// </summary>
export class HostRole {
    Role: string;
}