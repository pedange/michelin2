export class FieldModel {
  code: string;
  libelle: string;
  checked?: boolean;

  constructor(code: string, libelle: string, checked?: boolean) {
    this.code = code;
    this.libelle = libelle;
    this.checked = checked;
  }
}
