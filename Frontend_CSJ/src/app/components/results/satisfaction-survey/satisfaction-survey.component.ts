import { Component, OnInit } from '@angular/core';
import { SatisfactionSurveyModel } from '../../../models/satisfaction-survey-model';
import { AppComponent } from 'src/app/app.component';
import { ElasticService } from '../../../../services/elastic.service';

@Component({
  selector: 'app-satisfaction-survey',
  templateUrl: './satisfaction-survey.component.html',
  styleUrls: ['./satisfaction-survey.component.css']
})
export class SatisfactionSurveyComponent implements OnInit {

  public modal_quiz: boolean = false;
  public modal_confirm = false;
  public validateForm: boolean = false;
  public UrlRef:string = "";

  public satisfactionSurvey: SatisfactionSurveyModel = new SatisfactionSurveyModel();

  constructor(private services: ElasticService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.UrlRef = this.appComponent.UrlRef;
  }

  modalChange(): void {
    if (this.modal_quiz == false) {
      this.modal_quiz = true;
    } else{
      this.modal_quiz = false;
    }
  }

  modalChangeCofirmate(): void {
    if (this.modal_confirm == false) {
      this.modal_confirm = true;
    } else {
      this.modal_confirm = false;
    }
  }

  closeModal(): void {
    this.satisfactionSurvey.responses[0].reply = "";
    this.satisfactionSurvey.responses[1].reply = "";
    this.satisfactionSurvey.responses[2].reply = "";
    this.satisfactionSurvey.responses[3].reply = "";
    this.satisfactionSurvey.observations = "";

    this.modalChange();
  }

  sendSuvery(): void{
    if (this.satisfactionSurvey.responses[0].reply == "" || this.satisfactionSurvey.responses[1].reply == ""
    || this.satisfactionSurvey.responses[2].reply == "" || this.satisfactionSurvey.responses[3].reply == "") {
      this.validateForm = true;
    }
    else {
      this.validateForm = false;
      this.create();
      this.closeModal();
      //this.modalChange();
      this.modal_confirm = true;
      setTimeout(() => this.modalChangeCofirmate(), 3000)
    }
  }

  public creteSurvey(): void {
    this.services.postSatisfactionSurvey(this.satisfactionSurvey).subscribe();
  }

  public create(): void {
    this.services.postSatisfactionSurvey(this.satisfactionSurvey).subscribe(satisfactionSurvey => {
      
    })
  }
}

