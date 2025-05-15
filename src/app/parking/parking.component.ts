import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parking',
  imports: [CommonModule, FormsModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.scss'
})
export class ParkingComponent {
  private readonly numberOfSpots = 6;
  readonly $spots = signal<string[]>(Array(this.numberOfSpots).fill(''));
  readonly $isEditing = signal<boolean[]>(Array(this.numberOfSpots).fill(false))

  addReservation(index: number): void {
    this.$isEditing.update(isEditingArray => {
      const newEditing = [...isEditingArray];
      newEditing[index] = true;
      return newEditing;
    });
  }

  updateSpotOwnerName(name: string, index: number): void {
      this.$spots.update(spots => {
      const newSpots = [...spots];
      newSpots[index] = name;
      return newSpots;
    });
  }

  stopEditing(index: number): void {
    this.$isEditing.update(isEditingArray => {
      const newEditing = [...isEditingArray];
      newEditing[index] = false;
      return newEditing;
    });
  }

  removeReservation(index: number): void {
    this.$spots()[index] = '';
  }
}
