import { EntryListComponent } from "./JournalEntryList.js"
import { getEntries } from "./JournalDataProvider.js";
import {JournalFormComponent, handleChange} from "./form/JournalForm.js"

JournalFormComponent()
EntryListComponent();
getEntries();
