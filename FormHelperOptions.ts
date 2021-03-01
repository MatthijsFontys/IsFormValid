/**
 * An option object that can be passed in a formfield helper to customize the settings
 */
class FormHelperOptions {

    public validClassName: string;
    public invalidClassName: string;
    public debug: boolean;
    public submitIfValid: boolean;

    constructor(){
        this.setDefaults();
    }

    private setDefaults(): void {
        this.validClassName = "valid",
        this.invalidClassName = "invalid",
        this.debug = false,
        this.submitIfValid =  false
    }
}