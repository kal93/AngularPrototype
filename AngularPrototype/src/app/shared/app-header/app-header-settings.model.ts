/// <summary>
/// This class contains properties of App Header Component
/// </summary>
export class AppHeaderSettingsModel {
    // Provide Image Path
    public companyLogo?: string;
    // Application Name 
    public appName?: string;
    // Host System Name 
    public hostSystem: string;
    // Namespace Name
    public nameSpace?: string;
    // To display Logged In User Name
    public loggedInUser: string;
    // Tab list for navigation
    public tabList: Array<{
        // Tab name to display
        name: string,
        // Route Configuation
        path?: string,
        // Show/Hide Tab
        isVisible?: boolean
    }>;
    // Menu List in User Information Menu
    public menuList: Array<{
        // Menu Item name
        name: string
    }>;
}