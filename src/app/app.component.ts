import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

import { GridOptions } from 'ag-grid-community/main';
import { HeaderComponent } from './header-component/header.component';
import { HeaderGroupComponent } from './header-group-component/header-group.component';

// En tsconfig.json hay que añadir:
// "resolveJsonModule": true,
// "allowSyntheticDefaultImports": true
import localeTextESPes from '../assets/localeTextESPes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  private gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public gridOptions: GridOptions;
  public localeText;
  public sideBar;
  public rowData: any;
  public defaultSortModel;
  public rowGroupPanelShow;
  public statusBar;
  public paginationPageSize;
  public autoGroupColumnDef;

  public groupHeaderHeight = 25;
  public headerHeight = 86;
  private HeaderNumericWidth = 100;
  public isExpanded = false;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {headerName: 'Capítulo-Económico.',
        children: [
          // Se define el campo por el que se agrupará.
            {
            headerName: 'Capítulo',
            field: 'DesCap',
            rowGroup: true,
            hide: true,
            pinned: 'left'
          },

          {
            headerName: 'Capítulo',
            width: 220,
            pinned: 'left',
            // field: 'Capítulo',
            showRowGroup: 'DesCap',
            cellRenderer: 'agGroupCellRenderer',
            filter: false,
            cellRendererParams: {
              suppressCount: true,
              footerValueGetter(params) {
                switch (params.node.level) {
                  case 0:  // Total programa.
                    return '<span style="color: red; font-size: 14px; font-weight: bold; margin-left: 0px;"> Total ' + params.value + '</span>';
                  case -1: // Total general.
                    return '<span style="color: red; font-size: 18px; font-weight: bold; margin-right: 0px;"> Total general' + '</span>';
                  default:
                    return 'SIN FORMATO';
                }
              }
            }
          },

          // {
          //   headerName: '',
          //   field: 'DesCap',
          //   width: 100,
          //   hide: false,
          //   pinned: 'left',
          //   filter: false
          // },
          // {
          //   headerName: 'Capítulo',
          //   field: 'DesCap',
          //   width: 300,
          //   rowGroup: true,
          //   filter: false,
          //   pinned: 'left',
          //   showRowGroup: 'DesCap',
          //   cellRenderer: 'agGroupCellRenderer',
          //   valueGetter: params => {
          //     if (params.data) {
          //       return params.data.Capítulo + ' - ' + params.data.DesCap;
          //     } else {
          //       return null;
          //     }
          //   },
          //   cellRendererParams: {
          //     suppressCount: true,
          //     innerRenderer: params => {
          //       // console.log('params', params);
          //       if (params.node.group) {
          //         return params.value;
          //       } else {
          //         return '';
          //       }
          //     },
          //     footerValueGetter(params) {
          //       const val = params.value.split(' - ')[1];
          //       switch (params.node.level) {
          //         case 1:  // Total capítulo.
          //           return '<span style="color: red; font-size: 12px;  font-weight: bold; margin-left: 0px;"> Total ' + val + '</span>';
          //         case -1: // Total general.
          //           return '';
          //         default:
          //           return 'SIN FORMATO';
          //       }
          //     }
          //   }
          // },

          // Codigo y descripción económico.
          {
            headerName: '',
            field: 'Eco',
            width: 57,
            pinned: 'left',
            filter: false,
          },
          {
            headerName: 'Económico',
            field: 'Descripción',
            cellClass: 'resaltado',
            width: 400,
            pinned: 'left',
            filter: false,
          },
        ]
      },

      // Columnas con datos númericos.
            {
            // para separar el headerName en 3 lineas debe contener DOS comas.
            headerName: '    Previsiones,iniciales,',
            headerComponentFramework: HeaderComponent,
            field: 'Previsiones Iniciales',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'open',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Total,modificaciones,',
            headerComponentFramework: HeaderComponent,
            field: 'Total Modificaciones',
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
            ,
            // type: 'numericColumn',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'open',
            footerValueGetter(params) {
              const val = params.value;
              return '<span style="color: green; font-size: 12px; font-weight: bold; margin-left: 0px;"> Total ' + val + '</span>';
            }
          },
          {
            headerName: '    Previsiones,totales,',
            headerComponentFramework: HeaderComponent,
            field: 'Previsiones totales',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Derechos,reconocidos,netos',
            headerComponentFramework: HeaderComponent,
            field: 'Derechos Reconocidos Netos',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Derechos,recaudados,',
            headerComponentFramework: HeaderComponent,
            field: 'Derechos Recaudados',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Devoluciones de,ingresos,',
            headerComponentFramework: HeaderComponent,
            field: 'Devoluciones de ingreso',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Recaudación,líquida,',
            headerComponentFramework: HeaderComponent,
            field: 'Recaudación Líquida',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Derechos,pendientes,de cobro',
            headerComponentFramework: HeaderComponent,
            field: 'Derechos Pendientes de Cobro',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
          {
            headerName: '    Estado,de ejecución,',
            headerComponentFramework: HeaderComponent,
            field: 'Estado de Ejecución',
            width: this.HeaderNumericWidth,
            filter: false,
            columnGroupShow: 'Closed', // Se muestra por defecto.
            aggFunc: 'sum',
            cellRenderer: CellRendererOCM
          },
];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };

    this.sideBar = {
      toolPanels: ['filters', 'columns']
    };

    // this.rowGroupPanelShow = 'always';
    // this.statusBar = {
    //   statusPanels: [
    //     {
    //       statusPanel: 'agTotalAndFilteredRowCountComponent',
    //       align: 'left'
    //     },
    //     { statusPanel: 'agAggregationComponent' }
    //   ]
    // };
    // this.paginationPageSize = 500;

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {} as GridOptions;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: HeaderComponent as new () => HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    };

    this.defaultSortModel = [
      {
        colId: 'CodEco',
        sort: 'asc'
      }
    ];

    this.localeText = localeTextESPes;
    }

  ngOnInit() { }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.http.get('https://mamjerez.fra1.digitaloceanspaces.com/20191016ejeIng.json');
    params.api.setSortModel(this.defaultSortModel);
  }

  expandAll() {
    this.gridApi.expandAll();
    this.isExpanded = true;
  }

  collapseAll() {
    this.gridApi.collapseAll();
    this.isExpanded = false;
  }

}

function CellRendererOCM(params: any) {
  if (params.value) {
    const valorFormateado = params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (params.node.footer) {
      switch (params.node.level) {
        case 1: // Total capítulo.
          return '<p style="text-align: right; color: red; font-size: 12px; font-weight: bold">' + valorFormateado + '</p>';
        case 0:  // Total programa.
          return '<p style="text-align: right; color: red; font-size: 13px; font-weight: bold">' + valorFormateado + '</p>';
        case -1: // Total general.
          return '<p style="text-align: right; color: red; font-size: 14px; font-weight: bold">' + valorFormateado + '</p>';
        default:
          return 'SIN FORMATO';
      }
    } else {
      return '<p style="text-align: right">' + valorFormateado + '</p>';
    }
  } else {
    return '';
  }
}



