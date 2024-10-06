export class Event {
    title: string = "";
    date: string = "";
    description: string = "";
    isPublic: boolean = true;
    isMandatory: boolean = false;
    showResources: boolean = false;
    forms: string[] = [];
    resources: string[] = [];
    location: Location = new Location();
}

export class Location {
    name: string = "";
    address: string = "";
    url: string = "";
}
