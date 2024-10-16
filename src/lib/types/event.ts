export enum EventType {
    Event = "event",
    Checkpoint = "checkpoint",
    Cutoff = "cutoff",
}

export class Event {
    id!: string;
    title!: string;
    date!: Date;
    description: string = "";
    type: EventType = EventType.Event;
    isPublic: boolean = true;
    isMandatory: boolean = false;
    location: Location = new Location();
}

export class Location {
    name!: string;
    address: string = "";
    url: string = "";
}
