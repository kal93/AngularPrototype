/// <summary>
/// Interface implemented by components that encapsulate updatable information
/// </summary>
export interface IUnsavedChanges {
    //Returns 'true' when this component has unsaved changes.
    hasUnsavedChanges: boolean;
    //Message that should be shown to the user.
    unsavedChangesMessage: string;
}
