import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Nombre d\'éléments par page';
  override nextPageLabel     = 'Page suivante';
  override previousPageLabel = 'Page précédente';
  override firstPageLabel    = 'Première page';
  override lastPageLabel     = 'Dernière page';

  // Si vous surchargez également des méthodes, utilisez 'override' pour elles aussi
  // Exemple :
  // override getRangeLabel = (...) => {
  //   // Votre implémentation personnalisée
  // }
}
