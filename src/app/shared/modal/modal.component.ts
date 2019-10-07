import { Component, Output, EventEmitter, Input } from "@angular/core";


@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
    @Input() showModal : boolean
    @Input() title: string;
    @Input() body: string;
    @Input() okBtn: string;
    @Input() cancelBtn: string;
    @Input() params: string;

    @Output() onContinue: EventEmitter<string> = new EventEmitter<string>();
    @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();

    onCancelClick () {
        this.showModal = false;
        this.onCancel.emit(this.params);
    }

    onContinueClick () {
        this.showModal = false;
        this.onContinue.emit(this.params)
    }

}