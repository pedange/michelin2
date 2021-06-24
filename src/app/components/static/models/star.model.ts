export class StarModel {
  count: number;
  label: string;
  checked?: boolean;


  constructor(count: number, label: string, checked?: boolean) {
    this.count = count;
    this.label = label;
    this.checked = checked;
  }
}
