import {StarModel} from '../models/star.model';

export class StarList {
  public static VALUES: StarModel[] = [
    new StarModel(0, 'Aucune étoile'),
    new StarModel(1, 'Une étoile', true),
    new StarModel(2, 'Deux étoiles', true),
    new StarModel(3, 'Trois étoiles', true),
  ];

}
