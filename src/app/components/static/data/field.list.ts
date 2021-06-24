import {FieldModel} from '../models/field.model';

export class FieldList {
  public static VALUES: FieldModel[] = [
    new FieldModel('dts_id', 'Identifiant', true),
    new FieldModel('name', 'Nom du restaurant', true),
    new FieldModel('address', 'Adresse', true),
    new FieldModel('postcode', 'Code postale', true),
    new FieldModel('city', 'Ville', true),
    new FieldModel('country', 'Pays', true),
    new FieldModel('michelin_stars', `Nombre d'étoile`, true),
    new FieldModel('email', 'Email', true),
    new FieldModel('phone', 'Téléphone', true),
    new FieldModel('web', 'Site Web', true),
    new FieldModel('chef', 'Nom du chef', true),
    new FieldModel('version', 'Version', false),
  ];

}
