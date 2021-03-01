class FormLogger implements IFormLogger {

    private static _instance: IFormLogger = null;

    private constructor(){
        // Singleton    
    }

    public static get instance(): IFormLogger {
        return this._instance;
    }

    public static initInstance(isLoggingEnabled: boolean): IFormLogger {
        if(this._instance === null){
            if(isLoggingEnabled){
                this._instance = new FormLogger();
            }
            else{
                this._instance = new NullableLogger();
            }
        }
        return this._instance;
    }

    debugLog (message: any){
        console.log(`%cDebug: ${message} `, 'background-color: #333; color: #efefef; padding: 2px;');
    }
    debugTable (message: any[]){
        console.table(message);
    }



}