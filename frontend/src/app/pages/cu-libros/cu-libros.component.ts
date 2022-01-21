import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Genero, Producto, Producto2, username } from 'src/app/Estructura';
import { EditorialService } from 'src/app/services/editorial.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';
import { features } from 'process';

@Component({
  selector: 'app-cu-libros',
  templateUrl: './cu-libros.component.html',
  styleUrls: ['./cu-libros.component.css']
})
export class CuLibrosComponent implements OnInit {

  selectedImage: any = null;
  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required)
  });

  user : any = {};
  booleanCrear: boolean = false;
  arregloGeneros: Genero[] = [];
  arregloSeleccionados: Genero[] = [];
  // libro:any;
  libro: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categorias: [],
    idUser: '',
    foto: '',
    proveedor: '',
  };
  isParaSubastar = false;
  

  constructor(public dialogRef: MatDialogRef<CuLibrosComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  private servicioUsuario: ClientesService,
            private servicio: EditorialService, fb: FormBuilder, private storage: AngularFireStorage) { 
    if(data == null){
      // Se selecciono crear 
      this.booleanCrear = true;
      this.servicio.getAllGenres().subscribe(data => {
        this.arregloGeneros = data;
        for(let i = 0; i < this.arregloGeneros.length; i++){
          this.arregloGeneros[i].seleccionado = false;
        }
      });
    } else {
      // Se selecciono modificar
      this.libro = data;
      this.servicio.getAllGenres().subscribe(data1 => {
        this.arregloGeneros = data1;
        for(let i = 0; i < this.arregloGeneros.length; i++){
          for(let j = 0; j < data.generos.length; j++){
            if(this.arregloGeneros[i].nombre == data.generos[j].nombre){
              this.arregloGeneros[i].seleccionado = true;
            }
          }
        }
      });
      this.booleanCrear = false;
    }
  } 


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.libro.foto = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.libro.foto = '';
      this.selectedImage = null;
    }
  }
  terminarPuja(){
    this.servicioUsuario.finishSubasta(this.libro);
    alert("Subasta del producto terminada, entregada al usuario" + this.libro.nombre);
  }
  onSubmit(formValue){
    if(this.formTemplate.valid){
      var filePath = `${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            alert('La imagen se ha subido correctamente');
          })
        })
      ).subscribe();
    }
  }

  crear(){
    // Preparacion de generos------------------------------------------
    this.arregloSeleccionados = [];
    for(let i = 0; i< this.arregloGeneros.length; i++){
      if(this.arregloGeneros[i].seleccionado == true){
        this.arregloSeleccionados.push(
          { 
            _id: this.arregloGeneros[i]._id, 
            nombre: this.arregloGeneros[i].nombre,
            descripcion: this.arregloGeneros[i].descripcion
          });
      }
    }


    // Envio de datos--------------------------------------------------
    this.libro.nombre = this.libro.nombre;
    this.libro.descripcion = "Descripcion creativa";
    this.libro.foto = this.libro.foto;
    this.libro.precio = Number(this.libro.precio);
    this.libro.stock = Number(this.libro.stock);
    this.libro.categorias = ['utilidades','varios'];
    this.libro.proveedor = this.user;
    this.libro.idProvider = this.user.id;
    this.libro.id_producto = new Date().getTime().toString();
    this.libro.idUser = this.user.id;

    let grupo = JSON.parse(localStorage.getItem('grupo'));
    var jwt = this.user.token;
    
    if(grupo == 1){
      let dataGrupo1 = {
        nombre: this.libro.nombre,
        descripcion: "Descripcion creativa",
        foto: this.libro.foto,
        precio: this.libro.precio,
        stock:  this.libro.stock,
        categorias: "varios"
      }

      this.servicioUsuario.createProduct(dataGrupo1, jwt).subscribe(data => {
        alert('El producto ' + this.libro.nombre + ' se ha creado existosamente');
        this.dialogRef.close();
      }, error => {
        alert('Ha existido un error al crear el producto ' + this.libro.nombre);
      });

    }else{

      let dataGrupo2 = {
        nombre: this.libro.nombre,
        descripcion: "Descripcion creativa",
        foto: this.libro.foto,
        precio: Number(this.libro.precio),
        stock:  Number(this.libro.stock),
        categorias: ["Informatica","Teclado"]
      }

      
      this.servicioUsuario.createProduct(dataGrupo2, jwt).subscribe(data => {
        alert('El producto ' + this.libro.nombre + ' se ha creado existosamente');
        this.dialogRef.close();
      }, error => {
        alert('Ha existido un error al crear el producto ' + this.libro.nombre);
      });
    }



  }

  editar(){
    // Preparacion de generos------------------------------------------
    this.arregloSeleccionados = [];
    for(let i = 0; i< this.arregloGeneros.length; i++){
      if(this.arregloGeneros[i].seleccionado == true){
        this.arregloSeleccionados.push(
          { 
            _id: this.arregloGeneros[i]._id, 
            nombre: this.arregloGeneros[i].nombre,
            descripcion: this.arregloGeneros[i].descripcion
          });
      }
    }
    // Envio de datos--------------------------------------------------
    this.libro.precio = Number(this.libro.precio);
    this.libro.cantidad = Number(this.libro.cantidad);
    this.libro.generos = this.arregloSeleccionados;
    this.servicio.editBook(this.libro).subscribe(data => {
      alert('El producto ' + this.libro.nombre + ' se ha editado existosamente');
      this.dialogRef.close();
    }, error => {
      alert('Ha existido un error al editar el producto ' + this.libro.nombre);
    });
  }

  cancelar(){
    this.dialogRef.close();
  }

}
