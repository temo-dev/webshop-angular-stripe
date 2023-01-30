import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from "@angular/core";
import { StoreService } from "../../services/store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  categories: Array<string> = ["all"];
  categoriesSubcription: Subscription | undefined;
  currentCategory: string = "all";

  @Output() showCategory = new EventEmitter<string>();
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesSubcription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => {
        _categories.map((_category) => this.categories.push(_category));
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    this.currentCategory = category;
  }

  ngOnDestroy(): void {
    this.categoriesSubcription?.unsubscribe();
  }
}
