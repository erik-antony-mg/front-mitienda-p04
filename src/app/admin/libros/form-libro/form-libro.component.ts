import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../shared/libro.service';
import { Libro } from '../shared/libro.model';

@Component({
  selector: 'app-form-libro',
  templateUrl: './form-libro.component.html',
  styleUrls: ['./form-libro.component.css']
})
export class FormLibroComponent implements OnInit {

  formulario?: FormGroup;
  errors: any;
  libro?: Libro;


  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const idLibro = this.route.snapshot.paramMap.get('id');


    if (idLibro) {
      this.libroService.obtenerLibroById(parseInt(idLibro))
        .subscribe(data => {
          this.libro = data;

          this.formulario = this.fb.group({
            titulo: [data.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            slug: [this.libro.slug, [Validators.required, Validators.pattern('[a-z0-9-]+')]],
            descripcion: [this.libro.descripcion, [Validators.required, Validators.minLength(5)]],
            precio: [this.libro.precio, [Validators.required, Validators.min(0)]],
            rutaPortada: [this.libro.rutaPortada, [Validators.required]],
            rutaArchivo: [this.libro.rutaArchivo, [Validators.required]]

          }
          );
        });
    } else {
      this.formulario = this.fb.group({
        titulo: [, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        slug: [, [Validators.required, Validators.pattern('[a-z0-9-]+')]],
        descripcion: [, [Validators.required, Validators.minLength(10)]],
        precio: [, [Validators.required, Validators.min(0)]],
        rutaPortada: [, [Validators.required]],
        rutaArchivo: [, [Validators.required]]
      }
      );
    }

  }

  controlTieneError(control: string, error: string): Boolean {
    return this.formulario!.controls[control].hasError(error) && this.formulario!.controls[control].touched;
  }



  subirArchivo(event: any, control: string) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append(`file`, file);
      this.libroService.subirArchivo(formData)
        .subscribe(resp => {
          console.log('respuesta', resp);
          this.formulario?.controls[control].setValue(resp.ruta);

        })
    }
  }

  generarSlug() {
    const slug = this.formulario?.controls['titulo'].value
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
    this.formulario?.controls['slug'].setValue(slug);
  }



  guardar() {
    if (this.formulario!.invalid) {
      this.formulario!.markAllAsTouched();
      return
    }

    const nuevoLibro = this.formulario!.value;


    if (this.libro) {
      nuevoLibro.id = this.libro.id;
      this.libroService.actualizarLibro(nuevoLibro)
        .subscribe({
          next: data => {
            this.router.navigate(['/admin/libros'])
          },
          error: error => {
            this.errors = error.error.errors;
          }
        });
    } else {
      this.libroService.nuevoLibro(nuevoLibro)
        .subscribe({
          next: data => {
            this.router.navigate(['/admin/libros'])
          },
          error: error => {
            this.errors = error.error.errors;
          }
        });
    }


  }

}
