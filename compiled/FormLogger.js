class FormLogger {
    constructor() {
    }
    static get instance() {
        return this._instance;
    }
    static initInstance(isLoggingEnabled) {
        if (this._instance === null) {
            if (isLoggingEnabled) {
                this._instance = new FormLogger();
            }
            else {
                this._instance = new NullableLogger();
            }
        }
        return this._instance;
    }
    debugLog(message) {
        console.log(`%cDebug: ${message} `, 'background-color: #333; color: #efefef; padding: 2px;');
    }
    debugTable(message) {
        console.table(message);
    }
}
FormLogger._instance = null;
//# sourceMappingURL=FormLogger.js.map