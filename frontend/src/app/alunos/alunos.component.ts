import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno} from '../models/Aluno';
import { AlunoService} from '../alunos/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  public modalRef: BsModalRef;
  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno;
  public texto: string;
  public modo: string;

  public alunos: Aluno[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private alunoService: AlunoService) {
      this.criarForm();
    }

    ngOnInit() {
      this.carregarAlunos();
    }

    carregarAlunos() {
      this.alunoService.getAll().subscribe(
        (alunos: Aluno[]) => {
          this.alunos = alunos;
        },
        (erro: any) => {
          console.error(erro);
        }
      );
    }

    salvarAluno(aluno: Aluno) {
      (aluno.id !== 0) ? this.modo = 'put' : this.modo = 'post';
      this.alunoService[this.modo](aluno).subscribe(
        (aluno: Aluno) => {
          this.carregarAlunos();
        },
        (erro: any) => {
          console.error(erro);
        }
      );
    }

    deletarAluno(id: number) {
      this.alunoService.delete(id).subscribe(
        (model: any) => {
          console.log(model);
          this.carregarAlunos();
        },
        (erro: any) => {
          console.error(erro);
        }
      );
    }

    cadstrarAluno() {
      this.alunoSelecionado = new Aluno();
      this.alunoForm.patchValue(this.alunoSelecionado);
    }

    criarForm() {
      this.alunoForm = this.fb.group({
        id: [''],
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        telefone: ['', Validators.required]
      });
    }

    infoAluno(aluno: Aluno) {
      this.alunoSelecionado = aluno;
      this.alunoForm.patchValue(aluno);
    }

    voltar() {
      this.alunoSelecionado = null;
    }

    submit(){
      this.salvarAluno(this.alunoForm.value);
    }
  }
