import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../shared/usuario.service';
import { Usuario } from '../shared/usuario.model';
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  formulario?: FormGroup;
  errors: any;
  usuario?: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioServide: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    const idUsuario = this.route.snapshot.paramMap.get('id');

    if (idUsuario) {
      this.usuarioServide.obtenerUsuarioById(parseInt(idUsuario))
        .subscribe(resp => {
          this.usuario = resp;

          this.formulario = this.fb.group({
            nombres: [this.usuario.nombres, [Validators.required, Validators.maxLength(40)]],
            apellidos: [this.usuario.apellidos, [Validators.required]],
            email: [this.usuario.email, [Validators.required, Validators.email]],
            password: [this.usuario.password, [Validators.required, Validators.minLength(2)]],
            rol: [this.usuario.rol, [Validators.required]]
          });

        });
    } else {
      this.formulario = this.fb.group({
        nombres: [, [Validators.required, Validators.maxLength(40)]],
        apellidos: [, [Validators.required]],
        email: [, [Validators.required, Validators.email]],
        password: [, [Validators.required, Validators.minLength(2)]],
        rol: [, [Validators.required]]
      });
    }
  }
  controlTieneError(control: string, error: string): Boolean {
    return this.formulario!.controls[control].hasError(error);
  }

  guardar(): void {
    if (this.formulario!.invalid) {
      this.formulario!.markAllAsTouched();
      return
    }
    const nuevoUsuario = this.formulario!.value;

    if (this.usuario) {
      nuevoUsuario.id = this.usuario.id;
      this.usuarioServide.actualizarUsuario(nuevoUsuario)
        .subscribe({
          next: resp => {
            this.router.navigate(['/admin/usuarios'])
          },
          error: error => {
            this.errors = error.error.errors;
          }
        });

    } else {
      this.usuarioServide.nuevoUsuario(nuevoUsuario)
        .subscribe({
          next: resp => {
            this.router.navigate(['/admin/usuarios'])
          },
          error: error => {
            this.errors = error.error.errors;
          }
        });
    }


  }

}
