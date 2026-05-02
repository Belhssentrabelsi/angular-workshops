import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from './suggestion.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent implements OnInit {
  searchTerm: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private router: Router, private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestions = this.suggestionService.getSuggestions();
  }

  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      suggestion.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  like(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
    }
  }

  goToForm(): void {
    this.router.navigate(['/suggestions', 'add']);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }
}