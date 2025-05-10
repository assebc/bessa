import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { IRSJovem, IRSJovemTaxes, IRSTable } from './irs.defs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-irs',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './irs.component.html',
  styleUrl: './irs.component.scss'
})
export class IRSComponent {
  readonly irsJovem = IRSJovem;
  readonly irsTable = (R: number) => IRSTable(R);

  readonly $irsJovemYear = signal<number | undefined>(undefined);
  readonly $beforeTaxesSalary = signal<number>(this.irsTable(0)[0][0]);
  readonly $afterTaxesSalary = signal<number>(this.irsTable(0)[0][0]);
  readonly $irsTaxes = signal<number | undefined>(undefined);
  readonly $ssTaxes = signal<number | undefined>(undefined);

  updateBeforeTaxesSalary(salary: number): void {
    this.$beforeTaxesSalary.set(salary);
    this.clear();
  }

  selectIRSYear(year: number): void {
    this.$irsJovemYear.set(year);
  }

  calculateIRSJovem(): void {
    const IRSRow = this.getIRSTableRow();
    const [_, TMM, downPayment, TMMax] = IRSRow;

    let afterTaxesSalary = this.$beforeTaxesSalary();
    const r1 = afterTaxesSalary * TMM;
    const r2 = r1 - downPayment;
    const rPercentage = r2 / afterTaxesSalary;
    if (rPercentage > TMMax){ return; } // prettier-ignore
    
    const irsTaxes = this.getIRSTaxes();
    const r3 = afterTaxesSalary - afterTaxesSalary * irsTaxes;
    const d = parseFloat((r3 * rPercentage).toFixed(2));
    this.calculateSSTaxes();
    afterTaxesSalary -= (d < 0 ? 0 : d) + this.$ssTaxes()!;
    console.log(d, afterTaxesSalary, this.$ssTaxes(), this.$beforeTaxesSalary());
    this.$irsTaxes.set(d < 0 ? 0 : d);
    this.$afterTaxesSalary.set(afterTaxesSalary);
  }

  calculateIRS(): void {
    const IRSRow = this.getIRSTableRow();
    const [_, TMM, downPayment, TMMax] = IRSRow;

    let afterTaxesSalary = this.$beforeTaxesSalary();
    const r1 = afterTaxesSalary * TMM;
    const r2 = r1 - downPayment;
    const rPercentage = r2 / afterTaxesSalary;
    if (rPercentage > TMMax){ return; } // prettier-ignore
    const d = parseFloat((afterTaxesSalary * rPercentage).toFixed(2));

    this.calculateSSTaxes();
    afterTaxesSalary -= (d < 0 ? 0 : d) + this.$ssTaxes()!;
    console.log(d, afterTaxesSalary, this.$ssTaxes(), this.$beforeTaxesSalary());
    this.$irsTaxes.set(d < 0 ? 0 : d);
    this.$afterTaxesSalary.set(afterTaxesSalary);
  }

  private clear(): void {
    this.$irsTaxes.set(undefined);
    this.$ssTaxes.set(undefined);
  }

  private getIRSTableRow(): number[] {
    const table = this.irsTable(this.$beforeTaxesSalary());
    const rowIndex = table.findIndex((row) => row[0] > this.$beforeTaxesSalary());
    return table[rowIndex];
  }

  private getIRSTaxes(): number {
    const entry = Object.entries(IRSJovemTaxes).find(([_, years]) => years.includes(this.$irsJovemYear()!));
    return entry ? +entry[0] / 100 : 0;
  }

  private calculateSSTaxes(): void {
    const Taxes = this.$beforeTaxesSalary() * 0.11;
    this.$ssTaxes.set(parseFloat(Taxes.toFixed(2)));
  }
}
