import { EntryListComponent } from "./JournalEntryList.js"
import { getEntries } from "./JournalDataProvider.js";
import {JournalFormComponent, handleChange} from "./form/JournalForm.js"
import { FilterBar } from "./filter/FilterBar.js"
JournalFormComponent()
EntryListComponent();
getEntries();

