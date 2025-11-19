import { Injectable } from '@angular/core';


import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class NotificationToastServices {

  public toastSuccess(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast: { onmouseenter: any; onmouseleave: any; }) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: `${message} con éxito`,
      background: '#5F249F',
      color: '#FFFFFF'
    });
  }

  public async toastConfirm(message: string): Promise<boolean> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        popup: "!bg-[#18181B] !text-white",
        confirmButton: "bg-[#5F249F] text-white py-2 px-4 rounded-md hover:bg-[#4c1d7f] m-2 cursor-pointer no-underline",
        cancelButton: "bg-[#5F249F] text-white py-2 px-4 rounded-md hover:bg-[#4c1d7f] m-2 cursor-pointer no-underline"
      },
      buttonsStyling: false
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Confirmar",
      html: `
      <div class="flex flex-col items-center">
        <svg class="text-white w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
        <p class="text-white">¿Estás seguro de que quieres eliminar ${message}?</p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true
    });

    return result.isConfirmed;
  }





}
