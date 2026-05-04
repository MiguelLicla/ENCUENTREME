import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  loading = true;
  stats: any = {};
  today = new Date();
  
  // Charts
  lineChart: any;
  pieChart: any;

  constructor(private svc: DashboardService) {}

  ngOnInit(): void {
    this.svc.getReporte().subscribe({
      next: (r: any) => {
        this.stats = r.data ?? {};
        this.initCharts();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  initCharts() {
    this.lineChart = {
      series: [{ name: 'Objetos Hallados', data: [31, 40, 28, 51, 42, 109, 100] }, 
               { name: 'Reclamos', data: [11, 32, 45, 32, 34, 52, 41] }],
      chart: { height: 350, type: 'area', toolbar: { show: false } },
      colors: ['#00A1B1', '#f1963b'],
      stroke: { curve: 'smooth', width: 3 },
      xaxis: { categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] }
    };

    this.pieChart = {
      series: [44, 55, 13, 43],
      labels: ['Tecnología', 'Documentos', 'Accesorios', 'Otros'],
      chart: { type: 'donut', height: 220 },
      colors: ['#00A1B1', '#299cdb', '#f1963b', '#0ab39c']
    };
  }
}
