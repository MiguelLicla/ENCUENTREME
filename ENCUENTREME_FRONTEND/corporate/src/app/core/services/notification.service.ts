import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  success(msg: string) { this.toast.fire({ icon: 'success', title: msg }); }
  error(msg: string) { this.toast.fire({ icon: 'error', title: msg }); }
  warning(msg: string) { this.toast.fire({ icon: 'warning', title: msg }); }
  info(msg: string) { this.toast.fire({ icon: 'info', title: msg }); }
}
