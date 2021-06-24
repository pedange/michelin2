import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PoiDatasheetModel} from '../static/models/api-response.model';
import {FieldModel} from '../static/models/field.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() public datasheets: PoiDatasheetModel[];
  @Input() public fields: FieldModel[];
  @Output('close') public closeEmitter: EventEmitter<void> = new EventEmitter<void>();
  public copyBtn = {
    color: null,
    icon: 'fad fa-copy',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  public close(): void {
    this.closeEmitter.emit();
  }

  public copyTable(table: HTMLTableElement): void {
    this.copyBtn = {
      icon: 'fad fa-spinner fa-spin',
      color: 'grey',
    };
    setTimeout(() => {
      if (window.getSelection) {
        const selection = window.getSelection();
        const rangeToSelect = document.createRange();
        rangeToSelect.selectNodeContents(table);
        selection.removeAllRanges();
        selection.addRange(rangeToSelect);
        document.execCommand('copy');
        this.copyBtn = {
          icon: 'fad fa-copy',
          color: 'green',
        };
        selection.removeAllRanges();
        setTimeout(() => {
          this.copyBtn = {
            icon: 'fad fa-copy',
            color: null,
          };
        }, 2000);
      } else {
        alert(`'<span style="color:red;">Désolé, votre navigateur ne prend pas en compte cette option !</span><br>Utilisez <span class="label label-primary">ctrl+a</span> et <span class="label label-primary">ctrl+c</span> pour selectionner et copier l'ensemble de la page.'`);
      }
    }, 500);

  }

}
