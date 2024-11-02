export  default class Webhook {
    id?: string;
    name: string;  
    enabled: boolean;
    urlList: string[];

    constructor(name: string, id: string, enabled: boolean, urlList: string[]) {
        this.name = name;
        this.id = id;
        this.enabled = enabled;
        this.urlList = urlList;
    }

}

