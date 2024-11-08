import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { Event, Location } from "$lib/types/event";
import { EventType } from "$lib/types/event";
import { Term } from "$lib/types/term";
import { Phase } from "./types/phase";

export function weekFirstDay(date: dayjs.Dayjs): dayjs.Dayjs {
    return date.subtract(date.isoWeekday() - 1, "day");
}

export function whichWeek(term: Term, event?: Event, phase?: Phase): number {
    if ((event === undefined && phase === undefined) || (event !== undefined && phase !== undefined)) {
        throw new Error("Exactly one of event and phase must be defined");
    }

    const date = event !== undefined ? event.date : phase!.dateFrom;
    const eventDate = dayjs(date).hour(0).minute(0).second(0);
    const termStartDate = dayjs(term.startDate).hour(0).minute(0).second(0);
    const termStartWeekFirstDay = weekFirstDay(termStartDate);
    const eventWeek = eventDate.diff(termStartWeekFirstDay, "week") + term.firstWeek;

    return eventWeek;
}

export function termWeekFirstDay(term: Term, week: number): dayjs.Dayjs {
    const termStartDate = dayjs(term.startDate).hour(0).minute(0).second(0);
    const termStartWeekFirstDay = weekFirstDay(termStartDate);
    
    return termStartWeekFirstDay.add(week - term.firstWeek, "week");
}
