export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.oldCounter = 0;
        this.newCounter = 0;
    }
    // Обработка триггеров
    bindTriggers(officer, counter, items) {
        officer.querySelector('.plus').addEventListener('click', () => {
            /* 
            Показ карточек при нажатии на "плюс", как только показывается последняя карточка, 
            удаляется блок с добавлением(триггером) карточек
            */
            if (counter != items.length - 2) {
                items[counter].style.display = 'flex';
                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });
    }
    // Скрыть карточки
    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }
    // Инициализация 
    init() {
        this.hideItems(this.newItems);
        this.hideItems(this.oldItems);
        this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
        this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
    }
}