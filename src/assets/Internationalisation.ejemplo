// https://ag-grid.com/javascript-grid-internationalisation/

import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";

@Component({
  selector: "my-app",
  template: `
    <ag-grid-angular
      #agGrid
      style="width: 100%; height: 100%;"
      id="myGrid"
      class="ag-theme-balham"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [components]="components"
      [sideBar]="true"
      [pagination]="true"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [statusBar]="statusBar"
      [paginationPageSize]="paginationPageSize"
      [enableRangeSelection]="true"
      [enableCharts]="true"
      [localeText]="localeText"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private components;
  private rowGroupPanelShow;
  private statusBar;
  private paginationPageSize;
  private localeText;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "#",
        width: 50,
        cellRenderer: "rowNodeIdRenderer"
      },
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150
      },
      {
        headerName: "Age",
        field: "age",
        width: 90,
        enablePivot: true
      },
      {
        headerName: "Country",
        field: "country",
        width: 120,
        enableRowGroup: true
      },
      {
        headerName: "Year",
        field: "year",
        width: 90,
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Date",
        field: "date",
        width: 110
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110,
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100,
        enableValue: true
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100,
        enableValue: true
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100,
        enableValue: true
      },
      {
        headerName: "Total",
        field: "total",
        width: 100,
        enableValue: true
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };
    this.components = {
      rowNodeIdRenderer: function(params) {
        return params.node.id + 1;
      }
    };
    this.rowGroupPanelShow = "always";
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: "agTotalAndFilteredRowCountComponent",
          align: "left"
        },
        { statusPanel: "agAggregationComponent" }
      ]
    };
    this.paginationPageSize = 500;
    this.localeText = {
      page: "daPage",
      more: "daMore",
      to: "daTo",
      of: "daOf",
      next: "daNexten",
      last: "daLasten",
      first: "daFirsten",
      previous: "daPreviousen",
      loadingOoo: "daLoading...",
      selectAll: "daSelect Allen",
      searchOoo: "daSearch...",
      blanks: "daBlanc",
      filterOoo: "daFilter...",
      applyFilter: "daApplyFilter...",
      equals: "daEquals",
      notEqual: "daNotEqual",
      lessThan: "daLessThan",
      greaterThan: "daGreaterThan",
      lessThanOrEqual: "daLessThanOrEqual",
      greaterThanOrEqual: "daGreaterThanOrEqual",
      inRange: "daInRange",
      contains: "daContains",
      notContains: "daNotContains",
      startsWith: "daStarts dawith",
      endsWith: "daEnds dawith",
      andCondition: "daAND",
      orCondition: "daOR",
      group: "laGroup",
      columns: "laColumns",
      filters: "laFilters",
      rowGroupColumns: "laPivot Cols",
      rowGroupColumnsEmptyMessage: "la drag cols to group",
      valueColumns: "laValue Cols",
      pivotMode: "laPivot-Mode",
      groups: "laGroups",
      values: "laValues",
      pivots: "laPivots",
      valueColumnsEmptyMessage: "la drag cols to aggregate",
      pivotColumnsEmptyMessage: "la drag here to pivot",
      toolPanelButton: "la tool panel",
      noRowsToShow: "la no rows",
      pinColumn: "laPin Column",
      valueAggregation: "laValue Agg",
      autosizeThiscolumn: "laAutosize Diz",
      autosizeAllColumns: "laAutsoie em All",
      groupBy: "laGroup by",
      ungroupBy: "laUnGroup by",
      resetColumns: "laReset Those Cols",
      expandAll: "laOpen-em-up",
      collapseAll: "laClose-em-up",
      toolPanel: "laTool Panelo",
      export: "laExporto",
      csvExport: "laCSV Exportp",
      excelExport: "laExcel Exporto (.xlsx)",
      excelXmlExport: "laExcel Exporto (.xml)",
      pivotChartAndPivotMode: "laPivot Chart & Pivot Mode",
      pivotChart: "laPivot Chart",
      chartRange: "laChart Range",
      columnChart: "laColumn",
      groupedColumn: "laGrouped",
      stackedColumn: "laStacked",
      normalizedColumn: "la100% Stacked",
      barChart: "laBar",
      groupedBar: "laGrouped",
      stackedBar: "laStacked",
      normalizedBar: "la100% Stacked",
      pieChart: "laPie",
      pie: "laPie",
      doughnut: "laDoughnut",
      line: "laLine",
      xyChart: "laX Y (Scatter)",
      scatter: "laScatter",
      bubble: "laBubble",
      areaChart: "laArea",
      area: "laArea",
      stackedArea: "laStacked",
      normalizedArea: "la100% Stacked",
      pinLeft: "laPin &lt;&lt;",
      pinRight: "laPin &gt;&gt;",
      noPin: "laDontPin &lt;&gt;",
      sum: "laSum",
      min: "laMin",
      max: "laMax",
      none: "laNone",
      count: "laCount",
      average: "laAverage",
      filteredRows: "laFiltered",
      selectedRows: "laSelected",
      totalRows: "laTotal Rows",
      totalAndFilteredRows: "laRows",
      copy: "laCopy",
      copyWithHeaders: "laCopy Wit hHeaders",
      ctrlC: "ctrl n C",
      paste: "laPaste",
      ctrlV: "ctrl n V",
      pivotChartTitle: "laPivot Chart",
      rangeChartTitle: "laRange Chart",
      settings: "laSettings",
      data: "laData",
      format: "laFormat",
      categories: "laCategories",
      series: "laSeries",
      axis: "laAxis",
      color: "laColor",
      thickness: "laThickness",
      xRotation: "laX Rotation",
      yRotation: "laY Rotation",
      ticks: "laTicks",
      width: "laWidth",
      length: "laLength",
      padding: "laPadding",
      chart: "laChart",
      title: "laTitle",
      font: "laFont",
      top: "laTop",
      right: "laRight",
      bottom: "laBottom",
      left: "laLeft",
      labels: "laLabels",
      size: "laSize",
      legend: "laLegend",
      position: "laPosition",
      markerSize: "laMarker Size",
      markerStroke: "laMarker Stroke",
      markerPadding: "laMarker Padding",
      itemPaddingX: "laItem Padding X",
      itemPaddingY: "laItem Padding Y",
      strokeWidth: "laStroke Width",
      offset: "laOffset",
      tooltips: "laTooltips",
      offsets: "laOffsets",
      callout: "laCallout",
      markers: "laMarkers",
      shadow: "laShadow",
      blur: "laBlur",
      xOffset: "laX Offset",
      yOffset: "laY Offset",
      lineWidth: "laLine Width",
      normal: "laNormal",
      bold: "laBold",
      italic: "laItalic",
      boldItalic: "laBold Italic",
      fillOpacity: "laFill Opacity",
      strokeOpacity: "laLine Opacity",
      columnGroup: "laColumn",
      barGroup: "laBar",
      pieGroup: "laPie",
      lineGroup: "laLine",
      scatterGroup: "laScatter",
      areaGroup: "laArea",
      groupedColumnTooltip: "laGrouped",
      stackedColumnTooltip: "laStacked",
      normalizedColumnTooltip: "la100% Stacked",
      groupedBarTooltip: "laGrouped",
      stackedBarTooltip: "laStacked",
      normalizedBarTooltip: "la100% Stacked",
      pieTooltip: "laPie",
      doughnutTooltip: "laDoughnut",
      lineTooltip: "laLine",
      groupedAreaTooltip: "laGrouped",
      stackedAreaTooltip: "laStacked",
      normalizedAreaTooltip: "la100% Stacked",
      scatterTooltip: "laScatter",
      bubbleTooltip: "laBubble",
      noDataToChart: "laNo data available to be charted.",
      pivotChartRequiresPivotMode: "laPivot Chart requires Pivot Mode enabled."
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe(data => {
        // this.rowData = data;
      });
  }
}

function setDataSource(allOfTheData) {
  var dataSource = {
    getRows: function(params) {
      console.log("asking for " + params.startRow + " to " + params.endRow);
      setTimeout(function() {
        var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
        var lastRow = -1;
        if (allOfTheData.length <= params.endRow) {
          lastRow = allOfTheData.length;
        }
        params.successCallback(rowsThisPage, lastRow);
      }, 500);
    }
  };
  // gridInstance.api.setDatasource(dataSource);
}
