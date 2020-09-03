import { EntryListComponent } from "./JournalEntryList.js"
import { getEntries } from "./JournalDataProvider.js";
import {JournalFormComponent} from "./form/JournalForm.js"

JournalFormComponent()
EntryListComponent();
getEntries();