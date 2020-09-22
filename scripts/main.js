import { EntryListComponent } from "./JournalEntryList.js"
import { getEntries } from "./JournalDataProvider.js";
import {JournalFormComponent, handleChange} from "./form/JournalForm.js"
import { FilterBar } from "./filter/FilterBar.js"
import "./tags/TagList.js"
JournalFormComponent()
EntryListComponent();
// getEntries();

