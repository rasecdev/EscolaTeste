import { Component, OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/professor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfessorService} from '../Professores/professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  public modalRef: BsModalRef;
  public professorForm: FormGroup;
  public titulo = 'Professores';
  public professorSelecionado: Professor;
  public modo: string;

  public professores: Professor[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder
    , private modalService: BsModalService
    , private professorService: ProfessorService) {
      this.criarForm();
    }


  criarForm() {
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
      //disciplina: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarProfessor();
  }

  carregarProfessor() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  salvarProfessor(professor: Professor) {
    (professor.id !== 0) ? this.modo = 'put' : this.modo = 'post';
    this.professorService[this.modo](professor).subscribe(
      (professor: Professor) => {
        this.carregarProfessor();
        this.voltar();
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  deletarProfessor(id: number) {
    this.professorService.delete(id).subscribe(
      (professor: any) => {
        console.log(professor);
        this.carregarProfessor();
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  professorNovo(professor: Professor) {
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }

  infoProfessor(professor: Professor) {
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar() {
    this.professorSelecionado = null;
  }

  submit() {
    this.salvarProfessor(this.professorForm.value);
  }

  }
